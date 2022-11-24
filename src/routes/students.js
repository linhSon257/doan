const express = require('express')
const router = express.Router()

const studentController = require('../app/controllers/StudentController')

router.get('/create', studentController.create)
router.get('/manage', studentController.manage)
router.get('/trash', studentController.trash)
router.post('/store', studentController.store)
router.get('/:id/edit', studentController.edit)
router.get('/show/:id', studentController.show)
router.put('/:id', studentController.update)
router.patch('/:id/restore', studentController.restore)
router.delete('/:id', studentController.delete)
router.delete('/:id/force', studentController.forceDelete)
router.get('/', studentController.index)




module.exports = router;
