const express = require("express")
const sass = require("node-sass")
const path = require("path")
const mongoose = require('mongoose')
const morgan = require("morgan")
const methodOverride = require('method-override')
const { engine } = require("express-handlebars")
const app = express()
const port = 3001;
const route = require('./routes')
const db = require('./config/db')


db.connect();
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("combined"));
app.use(express.urlencoded())
app.subscribe(express.json())
app.use(methodOverride('_method'))

//template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a,b) => a+b,
    }
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
// Route init
route(app);


app.listen(port, () => console.log("App listening at " + port));


