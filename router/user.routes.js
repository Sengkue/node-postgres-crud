const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
