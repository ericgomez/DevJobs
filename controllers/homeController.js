const { response } = require('express')

const showJobs = (req, res = response) => {
  res.render('home', {
    pageName: 'devJobs',
    tagline: 'Find your dream job',
    line: true,
    button: true
  })
}

module.exports = {
  showJobs
}
