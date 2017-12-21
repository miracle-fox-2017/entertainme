const router = require('express').Router()
const movieControllers = require('../controllers/movieController')

router.get('/', movieControllers.getMovie)
router.post('/', movieControllers.addMovie)
router.put('/:id', movieControllers.editMovie)
router.delete('/:id', movieControllers.deleteMovie)

module.exports = router;
