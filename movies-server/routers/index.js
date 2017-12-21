const MoviesCtrl = require('../controllers')
const router = require('express').Router()

router.get('/', MoviesCtrl.getAllMovies)
router.get('/seed', MoviesCtrl.seedMovies)
router.post('/addnewdata', MoviesCtrl.addNewMovies)

module.exports = router
