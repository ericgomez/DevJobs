const { response } = require('express')

const formNewVacant = (req, res = response) => {
  res.render('new-vacant', {
    pageName: 'New Vacant',
    tagline: 'Create a new vacant'
  })
}

module.exports = {
  formNewVacant
}
