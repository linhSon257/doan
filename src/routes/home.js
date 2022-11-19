const express = require('express')
const router = express.Router()
const courseController = require('../app/controllers/CourseController')

const homeController = require('../app/controllers/HomeController')
//homeController.index


router.get('/',homeController.home)

module.exports = router;
