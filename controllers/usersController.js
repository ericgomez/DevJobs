const { response } = require('express')

const formCreateAccount = (req, res = response) => {
  res.render('users/create-account', {
    pageName: 'Create Account',
    tagline: 'Create your account'
  })
}

module.exports = {
  formCreateAccount
}
