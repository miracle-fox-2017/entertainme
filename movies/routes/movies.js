const express = require('express');
const router = express.Router();
const movie = require('../controllers/moviesController')

router.get('/', movie.getDataMovie)
router.post('/', movie.createMovie)

module.exports = router
