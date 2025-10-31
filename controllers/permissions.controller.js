const UserPermission = require('../models/user_permission.model');
const User = require('../models/user.model');

// Grant permission to a user
async function grant(req, res) {
  try {
    const { userId, resource, action } = req.body;
    if (!userId || !resource || !action) {
      return res.status(400).json({ message: 'userId, resource, and action are required' });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const [permission, created] = await UserPermission.findOrCreate({
      where: { userId, resource, action },
      defaults: { userId, resource, action },
    });

    res.status(created ? 201 : 200).json(permission);
  } catch (err) {
    res.status(500).json({ message: 'Failed to grant permission', error: err.message });
  }
}

// Revoke permission from a user
async function revoke(req, res) {
  try {
    const { userId, resource, action } = req.body;
    if (!userId || !resource || !action) {
      return res.status(400).json({ message: 'userId, resource, and action are required' });
    }

    const deleted = await UserPermission.destroy({ where: { userId, resource, action } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    res.json({ message: 'Permission revoked' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to revoke permission', error: err.message });
  }
}

// List all permissions for a user
async function listByUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const permissions = await UserPermission.findAll({ where: { userId } });
    res.json({ user, permissions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list permissions', error: err.message });
  }
}

// List all users with their permissions
async function listAll(req, res) {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    const permissions = await UserPermission.findAll();

    const grouped = users.map(user => ({
      ...user.get({ plain: true }),
      permissions: permissions.filter(p => p.userId === user.id),
    }));

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list all permissions', error: err.message });
  }
}

module.exports = { grant, revoke, listByUser, listAll };
