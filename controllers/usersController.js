const { response } = require('express')
const User = require('../models/users')

const formCreateAccount = (req, res = response) => {
  res.render('users/create-account', {
    pageName: 'Create Account',
    tagline: 'Create your account'
  })
}

const addUser = async (req, res = response, next) => {
  const user = new User(req.body)

  const newUser = await user.save()

  if (!newUser) return next()

  res.redirect('/login')
}

module.exports = {
  formCreateAccount,
  addUser
}
