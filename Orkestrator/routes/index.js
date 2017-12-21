const express = require('express');
const router = express.Router();
const Controller = require('../controller/orkestrator')
/* GET home page. */
router.get('/entertainme', Controller.findAll);

module.exports = router