const express = require ('express')
const path = require ('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const app = express()
const port = 3001

app.use(morgan('combined'))

//template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources/views'))

//console.log('PATH: ', path.join(__dirname, 'resources/views') )

app.get('/', (req, res) => {
    res.render('home')
})

app.listen (port, () => console.log('Example app listening at http://localhostis:${port}'))
