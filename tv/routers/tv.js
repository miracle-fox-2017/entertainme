const router = require('express').Router()
const tvControllers = require('../controllers/tvController')

router.get('/', tvControllers.getTv)
router.post('/', tvControllers.addTv)
router.put('/:id', tvControllers.editTv)
router.delete('/:id', tvControllers.deleteTv)

module.exports = router;
