const router = require('express').Router()
const movieControllers = require('../controllers/movieController')

router.get('/', movieControllers.getMovie)

module.exports = router;
