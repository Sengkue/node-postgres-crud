const express = require('express');
const { authRequired } = require('../middleware/auth.middleware');
const { requireRoles } = require('../middleware/role.middleware');
const controller = require('../controllers/permissions.controller');

const router = express.Router();

// Only admin and superAdmin can manage permissions
router.post('/grant', authRequired, requireRoles(['admin', 'superAdmin']), controller.grant);
router.post('/revoke', authRequired, requireRoles(['admin', 'superAdmin']), controller.revoke);
router.get('/user/:userId', authRequired, requireRoles(['admin', 'superAdmin']), controller.listByUser);
router.get('/', authRequired, requireRoles(['admin', 'superAdmin']), controller.listAll);

module.exports = router;
