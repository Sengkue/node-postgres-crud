const express = require('express');
const { authRequired } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');
const controller = require('../controllers/logs.controller');

const router = express.Router();

router.get('/', authRequired, requireRole('admin'), controller.list);

module.exports = router;
