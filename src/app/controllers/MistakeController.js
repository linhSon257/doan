const Mistake = require("../models/Mistake");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const Student = require("../models/Student");
const Term = require("../models/Term");

class MistakeController {
  //[GET] ---list Text----
  index(req, res, next) {
    Mistake.find({})
      .then((mistakes) => {
        res.render("mistakes/mistakeList", {
          mistakes: multipleMongooseToObject(mistakes),
        });
      })
      .catch(next);
  }
  show(req, res, next) {
    Mistake.findOne({ _id: req.params.id })
      .then((mistake) => {
        res.render("mistakes/show", { mistake: mongooseToObject(mistake) });
      })
      .catch(next);
  }

  //[GET] form create
  // async create(req, res, next) {
  //   try {
  //     const clats = await Clat.find().lean();
  //     let student = [];
  //     if (clats && clats.length > 0) {
  //       for (let i = 0; i < clats.student.length; i++) {
  //         let std = await Student.findById(clats.student[i]).lean();
  //         if (std) {
  //           student.push(std);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async create(req, res, next) {
   const terms = await Term.find().lean();
    const students = await Student.find().lean();
    res.render("mistakes/create", {
      terms,
      students,
    });
  }


  async get_student_from_class(req, res) {
    try {
      const { class_id } = req.body;
      if (!class_id) {
        return res.json({
          status: false,
        });
      }
      const has_class = await Clat.findById(class_id).lean();
      if (!has_class) {
        return res.json({
          status: false,
          message: "Class not found",
        });
      }

      let student = [];
      for (let i = 0; i < has_class.studentName.length; i++) {
        let std = await Student.findById(has_class.studentName[i]).lean();
        if (std) {
          student.push(std);
        }
      }

      res.json({
        data: student,
      });
    } catch (error) {
      res.json(error);
    }
  }

  //[POST]
  store(req, res, next) {
    const mistake = new Mistake(req.body);
    mistake
      .save()
      .then(() => res.redirect("/mistakes/manage"))
      .catch(next);
  }

 async edit(req, res, next) {
    const terms = await Term.find().lean();
    const students = await Student.find().lean();
    Mistake.findById(req.params.id)
      .then((mistake) =>
        res.render("mistakes/edit", {
          terms,
          students,
          mistake: mongooseToObject(mistake),
        })
      )
      .catch(next);
  }

  //[GET] /course/:id/
  async update(req, res, next) {
    Mistake.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/mistakes/manage"))
      .catch(next);
  }
  //[DELETE] /course/:id/
  delete(req, res, next) {
    Mistake.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /course/:id/force
  forceDelete(req, res, next) {
    Mistake.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[PATCH] /coures/:id/restore
  restore(req, res, next) {
    Mistake.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[get] /me/stored/terms
  async manage(req, res, next) {
    // const countDeleted = await Mistake.countDocumentsDeleted();
    // const response = await Mistake.find({})
    //   .populate("student")
    //   .populate("term")
    //   .lean();
    // // console.log(response);
    // res.render("mistakes/manage", {
    //   deleteCount: countDeleted,
    //   mistakes: response,
    // });

    Promise.all([
      Mistake.find({})
      .populate("student")
      .populate("term"),
      Mistake.countDocumentsDeleted(),
    ])
      .then(([mistakes, deletedCount]) => {
          res.render("mistakes/manage", {
            deletedCount,
            mistakes: multipleMongooseToObject(mistakes),
          })
      }
      )
      .catch(next);
  }

  //[get] 
 async trash(req, res, next) {
    Mistake.findDeleted({})
    .populate("student")
    .populate("term")
      .then((mistakes) =>
        res.render("mistakes/trash", {
          mistakes: multipleMongooseToObject(mistakes),
        })
      )
      .catch(next);
  }
}

module.exports = new MistakeController();
