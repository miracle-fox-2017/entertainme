const express = require('express');
const router = express.Router();
var movieController = require('../controller/movies');

router.get('/', movieController.all)
router.post('/', movieController.create)

module.exports = router
