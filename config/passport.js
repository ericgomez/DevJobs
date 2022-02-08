const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/users')

passport.use(
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const user = await User.findOne({ email })

      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' })
      }

      // check if password is correct
      // usage custom method comparePassword from model User
      const isMatch = await user.comparePassword(password)

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password' })
      }

      // return user
      return done(null, user)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)

  return done(null, user)
})

module.exports = passport
