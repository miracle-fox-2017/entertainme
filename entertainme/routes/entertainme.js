var router = require('express').Router();
const controller = require('../controllers/entertainme')

/* GET users listing. */
router.get('/', controller.listAll)

module.exports = router;
