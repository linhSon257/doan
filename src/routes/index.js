const newsRouter = require('./news')
const testxsRouter = require('./testxs')
const bonussRouter = require('./bonuss')
const termsRouter = require('./terms')
const meRouter = require('./me')
const coursesRouter = require('./courses')
const teachersRouter = require('./teachers')
const studentsRouter = require('./students')
const clatsRouter = require('./clats')
const homeRouter = require('./home')
const aboutRouter = require('./about')
const contactRouter = require('./contact')
function route(app) {
    
    app.use('/testxs', testxsRouter)
    app.use('/clats', clatsRouter)
    app.use('/bonuss', bonussRouter)
    app.use('/teachers', teachersRouter)
    app.use('/students', studentsRouter)
    app.use('/terms', termsRouter)
    app.use('/news', newsRouter)
    app.use('/courses', coursesRouter)
    // app.use('/courses', homeRouter)
    app.use('/me', meRouter)
    app.use('/home', homeRouter,)
    app.use('/about', aboutRouter)
    app.use('/contact', contactRouter)
    
}

module.exports = route;