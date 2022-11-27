const Clat = require("../models/Clat");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Term= require("../models/Term");

class ClatController {
  //[GET] ---list Text----
  index(req, res, next) {
    Clat.find({})
      .then((clats) => {
        res.render("clats/allclats", {
          clats: multipleMongooseToObject(clats),
        });
      })
      .catch(next);
  }

  show(req, res, next) {
    Clat.findOne({ _id: req.params.id })
      .then((clat) => {
        // res.render('/home', { clat: mongooseToObject(clat) }),
        res.render("clats/show", { clat: mongooseToObject(clat) });
      })
      .catch(next);
  }

  //[GET] form create
  async create(req, res, next) {
    const teachers = await Teacher.find({}).lean();
    const students = await Student.find().lean();
    const terms = await Term.find().lean();
    res.render("clats/create", {
      teachers,
      students,
      terms,
    });
    // Promise.all([Teacher.find({})])
    // .then(([teachers]) =>
    //     res.render('clats/create',{
    //         teachers: multipleMongooseToObject(teachers),
    //         // clats: multipleMongooseToObject(clats)
    //     })
    // )
    // .catch(next)
  }
  //[POST]
  store(req, res, next) {
    console.log(req.body);
    const clat = new Clat(req.body);
    clat
      .save()
      .then(() => res.redirect("/clats/manage"))
      .catch(next);
  }

 async edit(req, res, next) {
    const teachers = await Teacher.find().lean();
    const students = await Student.find().lean();
    const terms = await Term.find().lean();
    Clat.findById(req.params.id)
      .then((clat) =>
        res.render("clats/edit", {
          teachers,
          students,
          terms,
          clat: mongooseToObject(clat),
        })
      )
      .catch(next);
  }

  //[GET] /course/:id/
  update(req, res, next) {
    Clat.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/clats/manage"))
      .catch(next);
  }
  //[DELETE] /course/:id/
  delete(req, res, next) {
    Clat.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /course/:id/force
  forceDelete(req, res, next) {
    Clat.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[PATCH] /coures/:id/restore
  restore(req, res, next) {
    Clat.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }


  manage(req, res, next) {
    Promise.all([
      Clat.find({})
      .populate("teacher")
      .populate("student")
      .populate("term"),
      Clat.countDocumentsDeleted(),
    ])
      .then(([clats, deletedCount]) =>
        res.render("clats/manage", {
          deletedCount,
          clats: multipleMongooseToObject(clats),
        })
      )
      .catch(next);
  }

  getClat(req, res, next) {
    Promise.all([Clat.find({}), Clat.countDocumentsDeleted()])
      .then(([clats, deletedCount]) =>
        res.render("home", {
          deletedCount,
          clats: multipleMongooseToObject(clats),
        })
      )
      .catch(next);
  }

  //[get] /me/trash/courses
  trash(req, res, next) {
    Clat.findDeleted({})
      .then((clats) =>
        res.render("clats/trash", {
          clats: multipleMongooseToObject(clats),
        })
      )
      .catch(next);
  }
}

module.exports = new ClatController();
