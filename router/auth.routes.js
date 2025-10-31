const express = require('express');
const controller = require('../controllers/auth.controller');
const { authRequired } = require('../middleware/auth.middleware');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate.middleware');

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password min length 6'),
  ],
  validateRequest,
  controller.login
);
router.post('/logout', authRequired, controller.logout);
router.get('/me', authRequired, controller.me);

module.exports = router;
