const User = require('../models/user.model');

async function create(req, res) {
  try {
    const { name, email, password, role, isActive } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already exists' });
    const user = await User.create({ name, email, password, role, isActive });
    const { password: _, ...safe } = user.get({ plain: true });
    res.status(201).json(safe);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
}

async function findAll(req, res) {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
}

async function findOne(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password, role, isActive } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email && email !== user.email) {
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(409).json({ message: 'Email already exists' });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (password !== undefined) user.password = password;
    if (role !== undefined) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();
    const { password: _, ...safe } = user.get({ plain: true });
    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
}

module.exports = { create, findAll, findOne, update, remove };
