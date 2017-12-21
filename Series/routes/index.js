const express = require('express');
const router = express.Router();
const Controller = require('../controller/series')

/* GET Tv. */
router.get('/tv', Controller.findAll);

/* POST Tv. */
router.post('/tv', Controller.create);

module.exports = router;
