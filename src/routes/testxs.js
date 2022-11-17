const express = require('express')
const router = express.Router()

const testxController = require('../app/controllers/TestxController')
// testController.index



router.get('/create', testxController.create)
router.get('/manage', testxController.manage)
router.get('/trash', testxController.trash)
router.post('/store', testxController.store)
router.get('/:id/edit', testxController.edit)
router.get('/show/:id', testxController.show)
router.put('/:id', testxController.update)
router.patch('/:id/restore', testxController.restore)
router.delete('/:id', testxController.delete)
router.delete('/:id/force', testxController.forceDelete)
router.get('/', testxController.index)
module.exports = router;
