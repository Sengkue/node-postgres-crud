const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/index');

async function authRequired(req, res, next) {
  const header = req.headers['authorization'] || '';
  const [, token] = header.split(' ');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    // Enforce single active session: token jti must match DB and not be expired server-side
    const now = new Date();
    if (!user.currentTokenId || user.currentTokenId !== payload.jti || !user.tokenExpiresAt || user.tokenExpiresAt <= now) {
      return res.status(401).json({ message: 'Session expired or logged in elsewhere' });
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { authRequired };
