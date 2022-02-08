const { response } = require('express')
const { check, validationResult } = require('express-validator')

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

const deleteVacancy = async (req, res) => {
  const { id } = req.params

  console.log(id)
}

// validate vacancies
const validateVacancy = async (req, res, next) => {
  await check('title', 'The title is required')
    .notEmpty()
    .escape()
    .trim()
    .run(req)

  await check('company', 'company is required')
    .notEmpty()
    .escape()
    .trim()
    .run(req)

  await check('location', 'location is required')
    .notEmpty()
    .escape()
    .trim()
    .run(req)

  // salary not required
  await check('salary', 'salary is required')
    .escape()
    .trim()
    .run(req)

  await check('contract', 'contract is required')
    .notEmpty()
    .escape()
    .trim()
    .run(req)

  await check('skills', 'skills is required')
    .notEmpty()
    .escape()
    .trim()
    .run(req)

  // destructuring the validation result
  const { errors } = validationResult(req)
  // console.log(errors)

  if (errors) {
    req.flash(
      'error',
      errors.map(error => error.msg)
    )

    res.render('vacancies/new-vacancy', {
      pageName: 'New Vacancy',
      tagline: 'Create a new vacancy',
      name: req.user.name,
      logout: true,
      messages: req.flash()
    })

    return
  }

  next()
}

module.exports = {
  formNewVacancy,
  addVacancy,
  showVacancy,
  formEditVacancy,
  editVacancy,
  validateVacancy,
  deleteVacancy
}
