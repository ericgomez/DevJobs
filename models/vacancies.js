const { Schema, model } = require('mongoose')
const slug = require('slug')
const { nanoid } = require('nanoid')

const VacanciesSchema = Schema({
  title: {
    type: String,
    required: [true, 'The name of vacancy is required'],
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    required: [true, 'The location is required']
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
  candidates: [
    {
      name: String,
      email: String,
      cv: String
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The author is required']
  }
})

VacanciesSchema.pre('save', function (next) {
  const url = slug(this.title)
  this.url = `${url}-${nanoid()}`

  next()
})

// create index unique
VacanciesSchema.index({ title: 'text' })

module.exports = model('Vacancy', VacanciesSchema)
