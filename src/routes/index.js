const newsRouter = require('./news')
const testxsRouter = require('./testxs')
const meRouter = require('./me')
const coursesRouter = require('./courses')
const homeRouter = require('./home')
const aboutRouter = require('./about')
const contactRouter = require('./contact')
function route(app) {
    
    app.use('/testxs', testxsRouter)
    app.use('/news', newsRouter)
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter)
    app.use('/home', homeRouter)
    app.use('/about', aboutRouter)
    app.use('/contact', contactRouter)
}

module.exports = route;