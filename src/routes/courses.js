const express = require('express')
const router = express.Router()

const courseController = require('../app/controllers/CourseController')

router.get('/create', courseController.create)
router.get('/manage', courseController.manage)
router.get('/trash', courseController.trash)
router.post('/store', courseController.store)
router.get('/:id/edit', courseController.edit)
router.get('/show/:id', courseController.show)
router.put('/:id', courseController.update)
router.patch('/:id/restore', courseController.restore)
router.delete('/:id', courseController.delete)
router.delete('/:id/force', courseController.forceDelete)
router.get('/', courseController.index)




module.exports = router;
