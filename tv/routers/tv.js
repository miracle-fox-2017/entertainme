const router = require('express').Router()
const tvControllers = require('../controllers/tvController')

router.get('/', tvControllers.getTv)
router.post('/', tvControllers.addTv)

module.exports = router;
