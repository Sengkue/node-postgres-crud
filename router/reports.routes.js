const express = require('express');
const { authRequired } = require('../middleware/auth.middleware');
const { requirePermissions } = require('../middleware/permission.middleware');

const router = express.Router();

// Example: Reports endpoints protected by 'reports' resource permissions
router.get('/summary', authRequired, requirePermissions('reports', 'view'), (req, res) => {
  res.json({ message: 'Reports summary' });
});

router.get('/details', authRequired, requirePermissions('reports', 'view'), (req, res) => {
  res.json({ message: 'Reports details' });
});

module.exports = router;
