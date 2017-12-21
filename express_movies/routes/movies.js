var router = require('express').Router();
const controllerMovie = require('../controllers/movies')
/* GET users listing. */
router.post('/', controllerMovie.create)
router.get('/', controllerMovie.list)

module.exports = router;
