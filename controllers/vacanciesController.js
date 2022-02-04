const { response } = require('express')
const Vacant = require('../models/vacancies')

const formNewVacant = (req, res = response) => {
  res.render('new-vacant', {
    pageName: 'New Vacant',
    tagline: 'Create a new vacant'
  })
}

const addVacant = async (req, res = response) => {
  const vacant = new Vacant(req.body)

  // create array with skills
  // split - creating array separated by commas
  vacant.skills = req.body.skills.split(',')

  // Save in DB
  const newVacant = await vacant.save()

  // redirect to new vacant
  res.redirect(`/vacancies/${newVacant.url}`)
}

const showVacant = async (req, res = response, next) => {
  const vacant = await Vacant.findOne({ url: req.params.url })

  if (!vacant) return next()

  res.render('vacant', {
    pageName: vacant.title,
    line: true,
    vacant
  })
}

module.exports = {
  formNewVacant,
  addVacant,
  showVacant
}
