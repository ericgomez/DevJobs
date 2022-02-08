const passport = require('passport')

const authenticateUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
})

module.exports = {
  authenticateUser
}
