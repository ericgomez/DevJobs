const express = require('express')
const { engine } = require('express-handlebars')

const router = require('./routes')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

app.use('/', router())

app.listen(5000)
