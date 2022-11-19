const express = require('express')
const router = express.Router()

const termController = require('../app/controllers/TermController')
// testController.index



router.get('/create', termController.create)
router.get('/manage', termController.manage)
router.get('/trash', termController.trash)
router.post('/store', termController.store)
router.get('/:id/edit', termController.edit)
router.get('/show/:id', termController.show)
router.put('/:id', termController.update)
router.patch('/:id/restore', termController.restore)
router.delete('/:id', termController.delete)
router.delete('/:id/force', termController.forceDelete)
router.get('/', termController.index)
module.exports = router;
