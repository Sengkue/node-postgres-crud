const UserPermission = require('../models/user_permission.model');

async function requirePermissions(resource, action) {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // superAdmin bypasses all permission checks
      if (userRole === 'superAdmin') {
        return next();
      }

      // Check if user has explicit permission
      const permission = await UserPermission.findOne({
        where: { userId, resource, action },
      });

      if (!permission) {
        return res.status(403).json({ 
          message: 'Forbidden: missing permission',
          required: { resource, action },
        });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: 'Permission check failed', error: err.message });
    }
  };
}

module.exports = { requirePermissions };
