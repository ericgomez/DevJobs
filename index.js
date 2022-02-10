const express = require('express')
const { engine } = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const createError = require('http-errors')

require('dotenv').config()

const { dbConnect } = require('./config/db')
const router = require('./routes')
const passport = require('./config/passport')

const app = express()

//enabling body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine(
  'handlebars',
  engine({
    helpers: require('./helpers/handlebars'),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
)
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

app.use(cookieParser())

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: dbConnect()
    })
  })
)

// passport
app.use(passport.initialize())
app.use(passport.session())

// alert and flash messages
app.use(flash())

// create my middleware
app.use((req, res, next) => {
  res.locals.messages = req.flash()

  next()
})

app.use('/', router())

// 404 page not found
app.use((req, res, next) => {
  next(createError(404, 'Page not found'))
})

// error handler
app.use((err, req, res, next) => {
  res.locals.error = err.message

  res.status(err.status || 500)
  res.render('errors/error')
})

app.listen(process.env.PORT)
