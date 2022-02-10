const passport = require('passport')
const Vacancy = require('../models/vacancies')
const User = require('../models/users')
const crypto = require('crypto')
const sendEmail = require('../handlers/email')

const authenticateUser = passport.authenticate('local', {
  successRedirect: '/management',
  failureRedirect: '/login',
  failureFlash: true // flash message
  // badRequestMessage: 'both fields are required' // change default message
})

//check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

const showDashboard = async (req, res) => {
  // check user authentication
  const vacancies = await Vacancy.find({ author: req.user._id })

  res.render('management/dashboard', {
    pageName: 'Dashboard',
    tagline: 'Management',
    name: req.user.name,
    image: req.user.image,
    logout: true,
    vacancies
  })
}

const logout = (req, res) => {
  req.logout()

  req.flash('correct', 'You are logged out')
  return res.redirect('/login')
}

// forgot password
const formResetPassword = (req, res) => {
  res.render('auth/reset-password', {
    pageName: 'Reset Password',
    tagline: 'Reset your password'
  })
}

const sendToken = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    req.flash('error', 'The account not exist')
    return res.redirect('/login')
  }

  // User exist
  user.token = crypto.randomBytes(20).toString('hex')
  user.tokenExpires = Date.now() + 3600000

  await user.save()
  const resetUrl = `${req.headers.origin}/reset-password/${user.token}`

  await sendEmail({
    subject: 'Password Reset',
    template: 'reset-by-email',
    user,
    resetUrl
  })

  req.flash('correct', 'We sent you an email')
  res.redirect('/login')
}

const resetPassword = async (req, res) => {
  // check if token is valid
  const user = await User.findOne({
    token: req.params.token,
    tokenExpires: { $gt: Date.now() }
  })

  if (!user) {
    req.flash('error', 'Token is invalid or has expired')
    return res.redirect('/reset-password')
  }

  res.render('auth/new-password', {
    pageName: 'New Password',
    tagline: 'Enter your new password'
  })
}

module.exports = {
  authenticateUser,
  isAuthenticated,
  showDashboard,
  formResetPassword,
  sendToken,
  resetPassword,
  logout
}
