const express = require('express')
const router = express.Router()

const clatController = require('../app/controllers/ClatController')
// testController.index



router.get('/create', clatController.create)
router.get('/manage', clatController.manage)
router.get('/trash', clatController.trash)
router.post('/store', clatController.store)
router.get('/:id/edit', clatController.edit)
router.get('/show/:id', clatController.show)
router.put('/:id', clatController.update)
router.patch('/:id/restore', clatController.restore)
router.delete('/:id', clatController.delete)
router.delete('/:id/force', clatController.forceDelete)
router.get('/', clatController.index)
module.exports = router;
