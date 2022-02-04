const express = require('express')
const { engine } = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
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

app.use('/', router())

app.listen(process.env.PORT)
