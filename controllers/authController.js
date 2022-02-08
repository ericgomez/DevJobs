const passport = require('passport')

const authenticateUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true // flash message
  // badRequestMessage: 'both fields are required' // change default message
})

module.exports = {
  authenticateUser
}
