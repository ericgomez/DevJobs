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
    .escape()
    .trim()
    .run(req)

  await check('email', 'Email is required')
    .notEmpty()
    .escape()
    .trim()
    .run(req)

  await check('password', 'Password is required')
    .notEmpty()
    .escape()
    .trim()
    .run(req)

  await check('password_confirmation', 'Password confirmation is required')
    .notEmpty()
    .escape()
    .trim()
    .run(req)

  await check('password_confirmation')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      return true
    })
    .run(req)

  // destructuring the validation result
  const { errors } = validationResult(req)
  // console.log(errors)

  if (errors.length) {
    // TODO: add flash message
    req.flash(
      'error',
      errors.map(error => error.msg)
    )

    res.render('users/create-account', {
      pageName: 'Create Account',
      tagline: 'Create your account',
      messages: req.flash()
    })

    return
  }

  // if not exist errors then continue
  next()
}

const addUser = async (req, res = response, next) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.redirect('/login')
  } catch (error) {
    req.flash('error', error.message)
    res.redirect('/create-account')
  }
}

const formLogin = (req, res = response) => {
  res.render('users/login', {
    pageName: 'Login in DevJobs'
  })
}

const formEditProfile = (req, res = response) => {
  res.render('users/edit-profile', {
    pageName: 'Edit Profile',
    tagline: 'Edit your profile',
    user: req.user
  })
}

const editProfile = async (req, res = response, next) => {
  const { name, email, password } = req.body

  const user = await User.findById(req.user._id)

  user.name = name
  user.email = email

  // if password is not empty
  if (password) {
    user.password = password
  }

  try {
    await user.save()

    req.flash('correct', 'Profile updated successfully')
    res.redirect('/management')
  } catch (error) {
    req.flash('error', error.message)
    res.redirect('/edit-profile')
  }
}

module.exports = {
  formCreateAccount,
  confirmRegistration,
  addUser,
  formLogin,
  formEditProfile,
  editProfile
}
