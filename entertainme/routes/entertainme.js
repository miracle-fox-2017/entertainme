var router = require('express').Router();
const listAll = require('../controllers/entertainme')

/* GET users listing. */
router.get('/', listAll)

module.exports = router;
