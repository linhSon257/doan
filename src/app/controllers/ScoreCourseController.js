const ScoreCourse= require("../models/ScoreCourse");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const Student = require("../models/Student");
const Term = require("../models/Term");
const Course = require("../models/Course");

class ScoreCourseController {
  //[GET] ---list Text----
  index(req, res, next) {
    ScoreCourse.find({})
      .then((scoreCourses) => {
        res.render("scoreCourses/scoreCourseList", {
          scoreCourses: multipleMongooseToObject(scoreCourses),
        });
      })
      .catch(next);
  }
  show(req, res, next) {
    ScoreCourse.findOne({ _id: req.params.id })
      .then((scoreCourse) => {
        res.render("scoreCourses/show", { scoreCourse: mongooseToObject(scoreCourse) });
      })
      .catch(next);
  }


  async create(req, res, next) {
   const terms = await Term.find().lean();
    const students = await Student.find().lean();
    
    const courses = await Course.find().lean();
    res.render("scoreCourses/create", {
      terms,
      students,
      courses,
    });
  }



  //[POST]
  add(req, res, next) {
    const sum = (parseInt(req.body.test1) + parseInt(req.body.test2) + parseInt(req.body.test3 ))
    const a = parseInt(sum/3).toFixed(2)
    req.body.averageScoreCourse = (sum/3).toFixed(2)
    if(0<= a && a<5){
      req.body.statusScoreCourse = ('fail')
    }else if(5<= a && a<8)
    {
      req.body.statusScoreCourse = ('pass')
    }else{
      req.body.statusScoreCourse = ('excellent')
    }

    const scoreCourse = new ScoreCourse(req.body);
    scoreCourse
      .save()
      .then(() => res.redirect("/scoreCourses/manage"))
      .catch(next);
  }

 async edit(req, res, next) {
    const terms = await Term.find().lean();
    const students = await Student.find().lean();
    const courses = await Course.find().lean();
    ScoreCourse.findById(req.params.id)
      .then((scoreCourse) =>
        res.render("scoreCourses/edit", {
          terms,
          students,
          courses,
          scoreCourse: mongooseToObject(scoreCourse),
        })
      )
      .catch(next);
  }

  //[GET] /course/:id/
  async update(req, res, next) {
    ScoreCourse.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/scoreCourses/manage"))
      .catch(next);
  }
  //[DELETE] /course/:id/
  delete(req, res, next) {
    ScoreCourse.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /course/:id/force
  forceDelete(req, res, next) {
    ScoreCourse.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[PATCH] /coures/:id/restore
  restore(req, res, next) {
    ScoreCourse.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[get] /me/stored/terms
  async manage(req, res, next) {
    // const countDeleted = await ScoreCourse.countDocumentsDeleted();
    // const response = await ScoreCourse.find({})
    //   .populate("student")
    //   .populate("term")
    //   .lean();
    // // console.log(response);
    // res.render("scoreCourses/manage", {
    //   deleteCount: countDeleted,
    //   scoreCourses: response,
    // });

    Promise.all([
      ScoreCourse.find({})
      .populate("student")
      .populate("term")
      .populate("course"),
      ScoreCourse.countDocumentsDeleted(),
    ])
      .then(([scoreCourses, deletedCount]) => {
          res.render("scoreCourses/manage", {
            deletedCount,
            scoreCourses: multipleMongooseToObject(scoreCourses),
          })
      }
      )
      .catch(next);
  }

  //[get] /me/trash/terms
  async trash(req, res, next) {
      ScoreCourse.findDeleted({})
      .populate("student")
      .populate("term")
      .populate("course")
      .then((scoreCourses) =>
        res.render("scoreCourses/trash", { 
          scoreCourses: multipleMongooseToObject(scoreCourses),
         
        })
      )
      .catch(next);
  }
}

module.exports = new ScoreCourseController();
