const { response } = require('express')
const Vacancy = require('../models/vacancies')

const formNewVacancy = (req, res = response) => {
  res.render('vacancies/new-vacancy', {
    pageName: 'New Vacancy',
    tagline: 'Create a new vacancy',
    name: req.user.name,
    logout: true
  })
}

const addVacancy = async (req, res = response) => {
  const vacancy = new Vacancy(req.body)

  // add author with user authenticated
  vacancy.author = req.user._id

  // create array with skills
  // split - creating array separated by commas
  vacancy.skills = req.body.skills.split(',')

  // Save in DB
  const newVacancy = await vacancy.save()

  // redirect to new vacancy
  res.redirect(`/vacancies/${newVacancy.url}`)
}

const showVacancy = async (req, res = response, next) => {
  const vacancy = await Vacancy.findOne({ url: req.params.url })

  if (!vacancy) return next()

  res.render('vacancies/vacancy', {
    pageName: vacancy.title,
    line: true,
    vacancy
  })
}

const formEditVacancy = async (req, res = response, next) => {
  const vacancy = await Vacancy.findOne({ url: req.params.url })

  if (!vacancy) return next()

  res.render('vacancies/edit-vacancy', {
    pageName: `Edit ${vacancy.title}`,
    tagline: 'Edit a vacancy',
    vacancy,
    name: req.user.name,
    logout: true
  })
}

const editVacancy = async (req, res = response, next) => {
  const vacancy = req.body

  // create array with skills
  // split - creating array separated by commas
  vacancy.skills = req.body.skills.split(',')

  // Save in DB
  const editVacancy = await Vacancy.findOneAndUpdate(
    { url: req.params.url },
    vacancy,
    { new: true, runValidators: true }
  )

  // redirect to new vacancy
  res.redirect(`/vacancies/${editVacancy.url}`)
}

module.exports = {
  formNewVacancy,
  addVacancy,
  showVacancy,
  formEditVacancy,
  editVacancy
}
