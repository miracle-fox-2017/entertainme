const router = require('express').Router();
const movieController = require('../controllers/controller-movies');

router.get('/',movieController.allMovies);
router.get('/ver',movieController.version);

module.exports = router;
