const express = require('express')
const { engine } = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const flash = require('connect-flash')

require('dotenv').config()

const { dbConnect } = require('./config/db')
const router = require('./routes')

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

// alert and flash messages
app.use(flash())

// create my middleware
app.use((req, res, next) => {
  res.locals.messages = req.flash()

  next()
})

app.use('/', router())

app.listen(process.env.PORT)
