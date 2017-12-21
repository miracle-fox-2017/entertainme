const express = require('express');
const router = express.Router();
const Controller = require('../controller/movie')

/* GET Movie. */
router.get('/movie', Controller.findAll)

/* POST Movie. */
router.post('/movie', Controller.create)

module.exports = router;