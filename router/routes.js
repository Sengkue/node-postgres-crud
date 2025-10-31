const express = require('express');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const { authRequired } = require('../middleware/auth.middleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', authRequired, userRoutes);

module.exports = router;
