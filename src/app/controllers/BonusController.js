const Bonus = require("../models/Bonus");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const Student = require("../models/Student");
const Term = require("../models/Term");

class BonusController {
  //[GET] ---list Text----
  index(req, res, next) {
    Bonus.find({})
      .then((bonuss) => {
        res.render("bonuss/bonusList", {
          bonuss: multipleMongooseToObject(bonuss),
        });
      })
      .catch(next);
  }
  show(req, res, next) {
    Bonus.findOne({ _id: req.params.id })
      .then((bonus) => {
        res.render("bonuss/show", { bonus: mongooseToObject(bonus) });
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
    res.render("bonuss/create", {
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
    const bonus = new Bonus(req.body);
    bonus
      .save()
      .then(() => res.redirect("/bonuss/manage"))
      .catch(next);
  }

 async edit(req, res, next) {
    const terms = await Term.find().lean();
    const students = await Student.find().lean();
    Bonus.findById(req.params.id)
      .then((bonus) =>
        res.render("bonuss/edit", {
          terms,
          students,
          bonus: mongooseToObject(bonus),
        })
      )
      .catch(next);
  }

  //[GET] /course/:id/
  async update(req, res, next) {
    Bonus.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/bonuss/manage"))
      .catch(next);
  }
  //[DELETE] /course/:id/
  delete(req, res, next) {
    Bonus.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /course/:id/force
  forceDelete(req, res, next) {
    Bonus.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[PATCH] /coures/:id/restore
  restore(req, res, next) {
    Bonus.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[get] /me/stored/terms
  async manage(req, res, next) {
    // const countDeleted = await Bonus.countDocumentsDeleted();
    // const response = await Bonus.find({})
    //   .populate("student")
    //   .populate("term")
    //   .lean();
    // // console.log(response);
    // res.render("bonuss/manage", {
    //   deleteCount: countDeleted,
    //   bonuss: response,
    // });

    Promise.all([
      Bonus.find({})
      .populate("student")
      .populate("term"),
      Bonus.countDocumentsDeleted(),
    ])
      .then(([bonuss, deletedCount]) => {
          res.render("bonuss/manage", {
            deletedCount,
            bonuss: multipleMongooseToObject(bonuss),
          })
      }
      )
      .catch(next);
  }

  //[get] /me/trash/terms
  trash(req, res, next) {
    Bonus.findDeleted({})
      .then((bonuss) =>
        res.render("bonuss/trash", {
          bonuss: multipleMongooseToObject(bonuss),
        })
      )
      .catch(next);
  }
}

module.exports = new BonusController();
