const { response } = require('express')
const { check, validationResult } = require('express-validator')

const User = require('../models/users')

const formCreateAccount = (req, res = response) => {
  res.render('users/create-account', {
    pageName: 'Create Account',
    tagline: 'Create your account'
  })
}

const confirmRegistration = async (req, res = response, next) => {
  await check('name', 'The name is required')
    .notEmpty()
    .run(req)

  const errors = validationResult(req)
  console.log(errors)

  return
}

const addUser = async (req, res = response, next) => {
  const user = new User(req.body)

  const newUser = await user.save()

  if (!newUser) return next()

  res.redirect('/login')
}

module.exports = {
  formCreateAccount,
  confirmRegistration,
  addUser
}
