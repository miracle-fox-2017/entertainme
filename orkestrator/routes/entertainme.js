var router = require('express').Router();
const controller = require('../controllers/entertainme')

/* GET users listing. */
router.get('/', controller.listAll)
router.get('/uncache', controller.listUncache)

module.exports = router;
