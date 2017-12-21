const router = require('express').Router()
const entertainme = require('../controllers/entertainme')

router.get('/entertainme', entertainme.getAll)

module.exports = router;