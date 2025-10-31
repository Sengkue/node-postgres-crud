const express = require('express');
const controller = require('../controllers/user.controller');
const { requirePermissions } = require('../middleware/permission.middleware');

const router = express.Router();

router.post('/', requirePermissions('users', 'create'), controller.create);
router.get('/', requirePermissions('users', 'view'), controller.findAll);
router.get('/:id', requirePermissions('users', 'view'), controller.findOne);
router.put('/:id', requirePermissions('users', 'update'), controller.update);
router.delete('/:id', requirePermissions('users', 'delete'), controller.remove);

module.exports = router;
