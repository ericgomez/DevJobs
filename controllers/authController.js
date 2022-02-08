const passport = require('passport')
const Vacancy = require('../models/vacancies')

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

  console.log(vacancies)

  res.render('management/dashboard', {
    pageName: 'Dashboard',
    tagline: 'Management',
    name: req.user.name,
    logout: true,
    vacancies
  })
}

module.exports = {
  authenticateUser,
  isAuthenticated,
  showDashboard
}
