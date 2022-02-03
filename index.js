const express = require('express')
const { engine } = require('express-handlebars')

const router = require('./routes')

require('dotenv').config()

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

app.use('/', router())

app.listen(process.env.PORT)
