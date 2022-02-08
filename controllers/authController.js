const passport = require('passport')

const authenticateUser = passport.authenticate('local', {
  successRedirect: '/management',
  failureRedirect: '/login',
  failureFlash: true // flash message
  // badRequestMessage: 'both fields are required' // change default message
})

const showDashboard = (req, res) => {
  res.render('management/dashboard', {
    pageName: 'Dashboard',
    tagline: 'Management'
  })
}

module.exports = {
  authenticateUser,
  showDashboard
}
