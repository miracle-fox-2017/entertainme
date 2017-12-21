const router = require('express').Router();
const movieController = require('../controllers/controller-movies');

router.get('/',movieController.allMovies);

module.exports = router;
