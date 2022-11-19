const express = require('express')
const router = express.Router()

const teacherController = require('../app/controllers/TeacherController')

router.get('/create', teacherController.create)
router.get('/manage', teacherController.manage)
router.get('/trash', teacherController.trash)
router.post('/store', teacherController.store)
router.get('/:id/edit', teacherController.edit)
router.get('/show/:id', teacherController.show)
router.put('/:id', teacherController.update)
router.patch('/:id/restore', teacherController.restore)
router.delete('/:id', teacherController.delete)
router.delete('/:id/force', teacherController.forceDelete)
router.get('/', teacherController.index)




module.exports = router;
