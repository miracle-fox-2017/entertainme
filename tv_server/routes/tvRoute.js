const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tvController');

/* GET users listing. */
router.get('/', tvController.findAll);
router.post('/create', tvController.create);


module.exports = router;