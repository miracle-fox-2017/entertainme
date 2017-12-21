const express = require('express');
const router = express.Router();
const Controller = require('../controller/series')

/* GET Tv. */
router.get('/tv', Controller.findAll);
router.get('/tv/version', Controller.getVersion)

/* POST Tv. */
router.post('/tv', Controller.create);

/* PUT Tv. */
router.put('/tv/:seriesId', Controller.update);

module.exports = router;
