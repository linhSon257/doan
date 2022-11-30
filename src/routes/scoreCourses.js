const express = require('express')
const router = express.Router()

const scoreCourseController = require('../app/controllers/ScoreCourseController')


// router.post("/class/student-list", scoreCourseController.get_student_from_class)
router.get('/create', scoreCourseController.create)
router.get('/manage', scoreCourseController.manage)
router.get('/trash', scoreCourseController.trash)
router.post('/add', scoreCourseController.add)
router.get('/:id/edit', scoreCourseController.edit)
router.get('/show/:id', scoreCourseController.show)
router.put('/:id', scoreCourseController.update)
router.patch('/:id/restore', scoreCourseController.restore)
router.delete('/:id', scoreCourseController.delete)
router.delete('/:id/force', scoreCourseController.forceDelete)
router.get('/', scoreCourseController.index)



module.exports = router;
