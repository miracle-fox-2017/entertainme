const express = require('express');
const router = express.Router();
const movies = require('../controllers/movies')

router.get('/', movies.getAllMovies)
router.post('/', movies.postMovies)

module.exports = router;