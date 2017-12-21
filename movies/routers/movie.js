const router = require('express').Router()
const movieControllers = require('../controllers/movieController')

router.get('/', movieControllers.getMovie)
router.post('/', movieControllers.addMovie)

module.exports = router;
