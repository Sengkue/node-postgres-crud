const express = require('express');
const { authRequired } = require('../middleware/auth.middleware');
const { requirePermissions } = require('../middleware/permission.middleware');

const router = express.Router();

// Example: Sales endpoints protected by 'sales' resource permissions
router.post('/', authRequired, requirePermissions('sales', 'create'), (req, res) => {
  res.json({ message: 'Sale created' });
});

router.get('/', authRequired, requirePermissions('sales', 'view'), (req, res) => {
  res.json({ message: 'Sales list' });
});

router.get('/:id', authRequired, requirePermissions('sales', 'view'), (req, res) => {
  res.json({ message: 'Sale detail' });
});

router.put('/:id', authRequired, requirePermissions('sales', 'update'), (req, res) => {
  res.json({ message: 'Sale updated' });
});

router.delete('/:id', authRequired, requirePermissions('sales', 'delete'), (req, res) => {
  res.json({ message: 'Sale deleted' });
});

module.exports = router;
