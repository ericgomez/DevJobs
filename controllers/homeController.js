const { response } = require('express')
const Vacancy = require('../models/vacancies')

const showJobs = async (req, res = response, next) => {
  const vacancies = await Vacancy.find()

  if (!vacancies) return next()

  res.render('home', {
    pageName: 'devJobs',
    tagline: 'Find your dream job',
    line: true,
    button: true,
    vacancies
  })
}

module.exports = {
  showJobs
}
