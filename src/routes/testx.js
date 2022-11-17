const express = require('express')
const router = express.Router()

const testxController = require('../app/controllers/TestxController')
// testController.index


router.get('/', testxController.index)
router.get('/create', testxController.create)

router.post('/', testxController.store)

module.exports = router;
