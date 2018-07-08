const router = require('express').Router()
const entertainControllers = require('../controllers/entertainController');

router.get('/', entertainControllers.entertain)

module.exports = router;
