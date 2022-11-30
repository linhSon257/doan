const express = require('express')
const router = express.Router()

const mistakeController = require('../app/controllers/MistakeController')
// testController.index


// router.post("/class/student-list", mistakeController.get_student_from_class)
router.get('/create', mistakeController.create)
router.get('/manage', mistakeController.manage)
router.get('/trash', mistakeController.trash)
router.post('/store', mistakeController.store)
router.get('/:id/edit', mistakeController.edit)
router.get('/show/:id', mistakeController.show)
router.put('/:id', mistakeController.update)
router.patch('/:id/restore', mistakeController.restore)
router.delete('/:id', mistakeController.delete)
router.delete('/:id/force', mistakeController.forceDelete)
router.get('/', mistakeController.index)



module.exports = router;
