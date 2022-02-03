const { Schema, model } = require('mongoose')
const slug = require('slug')
const { nanoid } = require('nanoid')

const vacanciesSchema = new Schema({
  title: {
    type: String,
    required: 'The name of vacant is required',
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    required: 'The location is required'
  },
  salary: {
    type: String,
    default: 0,
    trim: true
  },
  contract: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  },
  skills: [String],
  candidate: [
    {
      name: String,
      email: String,
      cv: String
    }
  ]
})

vacanciesSchema.pre('save', function (next) {
  const url = slug(this.title)
  this.url = `${url}-${nanoid()}`

  next()
})

module.exports = model('Vacant', vacanciesSchema)
