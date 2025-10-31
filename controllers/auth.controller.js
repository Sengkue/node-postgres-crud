const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const config = require('../config/index');
const { randomUUID } = require('crypto');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    // Single-session: generate new jti and persist to user; this invalidates any previous session
    const jti = randomUUID();
    const expiresInSec = 60 * 60 * 24; // 1 day
    const expiresAt = new Date(Date.now() + expiresInSec * 1000);

    user.currentTokenId = jti;
    user.tokenExpiresAt = expiresAt;
    await user.save();

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: expiresInSec, jwtid: jti });

    const { password: _, ...safe } = user.get({ plain: true });
    res.json({ token, user: safe });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

async function logout(req, res) {
  try {
    const { id } = req.user;
    const user = await User.findByPk(id);
    if (user) {
      user.currentTokenId = null;
      user.tokenExpiresAt = null;
      await user.save();
    }
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed', error: err.message });
  }
}

async function me(req, res) {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
}

module.exports = { login, logout, me };
