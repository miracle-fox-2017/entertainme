const express = require('express');
const router = express.Router();
const Controller = require('../controller/movie')

/* GET Movie. */
router.get('/movie', Controller.findAll)
router.get('/movie/version', Controller.getVersion)


/* POST Movie. */
router.post('/movie', Controller.create)

/* PUT Tv. */
router.put('/movie/:movieId', Controller.update);

module.exports = router;