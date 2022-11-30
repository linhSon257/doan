const express = require('express')
const router = express.Router()

const resultStudentController = require('../app/controllers/ResultStudentController')


// router.post("/class/student-list", resultStudentController.get_student_from_class)
router.get('/create', resultStudentController.create)
router.get('/manage', resultStudentController.manage)
router.get('/trash', resultStudentController.trash)
router.post('/add', resultStudentController.add)
router.get('/:id/edit', resultStudentController.edit)
router.get('/show/:id', resultStudentController.show)
router.put('/:id', resultStudentController.update)
router.patch('/:id/restore', resultStudentController.restore)
router.delete('/:id', resultStudentController.delete)
router.delete('/:id/force', resultStudentController.forceDelete)
router.get('/', resultStudentController.index)



module.exports = router;
