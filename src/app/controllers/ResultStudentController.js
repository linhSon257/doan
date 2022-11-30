const ResultStudent= require("../models/ResultStudent");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const Student = require("../models/Student");
const Term = require("../models/Term");
const Course = require("../models/Course");

class ResultStudentController {
  //[GET] ---list Text----
  index(req, res, next) {
    ResultStudent.find({})
      .then((resultStudents) => {
        res.render("resultStudents/resultStudentList", {
          resultStudents: multipleMongooseToObject(resultStudents),
        });
      })
      .catch(next);
  }
  show(req, res, next) {
    ResultStudent.findOne({ _id: req.params.id })
      .then((resultStudent) => {
        res.render("resultStudents/show", { resultStudent: mongooseToObject(resultStudent) });
      })
      .catch(next);
  }


  async create(req, res, next) {
   const terms = await Term.find().lean();
    const students = await Student.find().lean();
    
    const courses = await Course.find().lean();
    res.render("resultStudents/create", {
      terms,
      students,
      courses,
    });
  }



  //[POST]
  add(req, res, next) {
    const sum = (parseInt(req.body.test1) + parseInt(req.body.test2) + parseInt(req.body.test3 ))
    const a = parseInt(sum/3).toFixed(2)
    req.body.averageResultStudent = (sum/3).toFixed(2)
    if(0<= a && a<5){
      req.body.statusResultStudent = ('fail')
    }else if(5<= a && a<8)
    {
      req.body.statusResultStudent = ('pass')
    }else{
      req.body.statusResultStudent = ('excellent')
    }

    const resultStudent = new ResultStudent(req.body);
    resultStudent
      .save()
      .then(() => res.redirect("/resultStudents/manage"))
      .catch(next);
  }

 async edit(req, res, next) {
    const terms = await Term.find().lean();
    const students = await Student.find().lean();
    const courses = await Course.find().lean();
    ResultStudent.findById(req.params.id)
      .then((resultStudent) =>
        res.render("resultStudents/edit", {
          terms,
          students,
          courses,
          resultStudent: mongooseToObject(resultStudent),
        })
      )
      .catch(next);
  }

  //[GET] /course/:id/
  async update(req, res, next) {
    ResultStudent.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/resultStudents/manage"))
      .catch(next);
  }
  //[DELETE] /course/:id/
  delete(req, res, next) {
    ResultStudent.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /course/:id/force
  forceDelete(req, res, next) {
    ResultStudent.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[PATCH] /coures/:id/restore
  restore(req, res, next) {
    ResultStudent.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[get] /me/stored/terms
  async manage(req, res, next) {
    // const countDeleted = await ResultStudent.countDocumentsDeleted();
    // const response = await ResultStudent.find({})
    //   .populate("student")
    //   .populate("term")
    //   .lean();
    // // console.log(response);
    // res.render("resultStudents/manage", {
    //   deleteCount: countDeleted,
    //   resultStudents: response,
    // });

    Promise.all([
      ResultStudent.find({})
      .populate("student")
      .populate("term")
      .populate("course"),
      ResultStudent.countDocumentsDeleted(),
    ])
      .then(([resultStudents, deletedCount]) => {
          res.render("resultStudents/manage", {
            deletedCount,
            resultStudents: multipleMongooseToObject(resultStudents),
          })
      }
      )
      .catch(next);
  }

  //[get] /me/trash/terms
  async trash(req, res, next) {
      ResultStudent.findDeleted({})
      .populate("student")
      .populate("term")
      .populate("course")
      .then((resultStudents) =>
        res.render("resultStudents/trash", { 
          resultStudents: multipleMongooseToObject(resultStudents),
         
        })
      )
      .catch(next);
  }
}

module.exports = new ResultStudentController();
