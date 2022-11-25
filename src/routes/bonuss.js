const express = require('express')
const router = express.Router()

const bonusController = require('../app/controllers/BonusController')
// testController.index


router.post("/class/student-list", bonusController.get_student_from_class)
router.get('/create', bonusController.create)
router.get('/manage', bonusController.manage)
router.get('/trash', bonusController.trash)
router.post('/store', bonusController.store)
router.get('/:id/edit', bonusController.edit)
router.get('/show/:id', bonusController.show)
router.put('/:id', bonusController.update)
router.patch('/:id/restore', bonusController.restore)
router.delete('/:id', bonusController.delete)
router.delete('/:id/force', bonusController.forceDelete)
router.get('/', bonusController.index)



module.exports = router;
