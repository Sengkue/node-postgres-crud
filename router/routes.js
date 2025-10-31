const express = require('express');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const permissionsRoutes = require('./permissions.routes');
const salesRoutes = require('./sales.routes');
const reportsRoutes = require('./reports.routes');
const { authRequired } = require('../middleware/auth.middleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', authRequired, userRoutes);
router.use('/permissions', permissionsRoutes);
router.use('/sales', salesRoutes);
router.use('/reports', reportsRoutes);

module.exports = router;
