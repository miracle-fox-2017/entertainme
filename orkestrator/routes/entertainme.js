const router = require('express').Router()
const entertainme = require('../controllers/entertainme')

router.get('/entertainme', entertainme.getAll)
router.get('/entertainme/movies', entertainme.getMovies)
router.get('/entertainme/tv', entertainme.getTv)

module.exports = router;