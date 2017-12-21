const router = require('express').Router()
const tvControllers = require('../controllers/tvController')

router.get('/', tvControllers.getTv)

module.exports = router;
