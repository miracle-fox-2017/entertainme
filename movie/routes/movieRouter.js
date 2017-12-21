const express = require('express')
const router = express.Router()
const movieCtrl = require('../controllers/movieController')

router.get('/', movieCtrl.getMovie)
router.post('/', movieCtrl.postMovie)

module.exports = router
