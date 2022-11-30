const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

const jwt = require("jsonwebtoken");

class AuthController {
  login(req, res) {
    res.render("auths/login");
  }

  async postLogin(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    let _teacher = await Teacher.findOne({
      $or: [{ teacherEmail: email }],
    });
       let _student = await Student.findOne({
      $or: [{ studentEmail: email }],
    });
    let _admin = await Admin.findOne({
      $or: [{ adminEmail: email }],
    });

    if (_teacher) {
        if(password == _teacher?.teacherPassword){
            let token = jwt.sign(
                { name: _teacher.teacherName },
                "verySecretValue",
                { expiresIn: "1h" }
              );
              res.cookie('_id', _teacher.role )
              res.redirect("/home")
              token
              
        }else {
            res.render("auths/login");
        }
      }else if (_student) {
        if(password == _student?.studentPassword){
            let token = jwt.sign(
                { name: _student.studentName },
                "verySecretValue",
                { expiresIn: "1h" }
              );
              res.cookie('_id', _student.role )
              res.redirect("/home")
              token
        }else {
          res.render("auths/login");
      }
      }else if (_admin) {
        if(password == _admin?.adminPassword){
            let token = jwt.sign(
                { name: _admin.adminName },
                "verySecretValue",
                { expiresIn: "1h" }
              );
              res.cookie('_id', _admin.role )
              res.redirect("/home")
              token
        }
        else {
          res.render("auths/login");
      }
      }else{
        res.render("auths/login");
    }

    // console.log(cookie)
  }
 
}

module.exports = new AuthController();

// postLogin(req,res){
//     var email = req.body.email
//     var password = req.body.password
//     Teacher.find({})
//     .then(teachers =>{
//         console.log(teachers)
//         res.render('auths/login',{
//             teachers: multipleMongooseToObject(teachers)
//         })
//     }

//     )
// console.log(password)
//     if (user == email){
//         res.render('auths/login',{
//             error: ['User does not exist'],
//             value: req.body
//         })

//         return;
//     }

//     if (user.password == password){
//         res.render('auths/login',{
//             error: ['Wrong password'],
//             value: req.body
//         })

//         return;
//     }

//     res.redirect('/home')
//  }




    // Teacher.findOne({
    //   $or: [{ teacherEmail: email }, { teacherPhoneNumber: email }],
    // }).then((teacher) => {
    //   if (teacher) {
    //     bcrypt.compare(
    //       password,
    //       teacher.teacherPassword,
    //       function (err, result) {
    //         if (err) {
    //           res.json({
    //             error: err,
    //           });
    //         }
    //         if (result) {
    //           let token = jwt.sign(
    //             { name: teacher.teacherName },
    //             "verySecretValue",
    //             { expiresIn: "1h" }
    //           );
    //           res.redirect("home", {
    //             token,
    //           });
    //         } else {
    //           res.render("auths/login");
    //         }
    //       }
    //     );
    //   } else {
    //     res.render("auths/login", {
    //       message: "no Email!!",
    //     });
    //   }
    // });