const { Router, response } = require('express')
const router = Router()

const { showJobs } = require('../controllers/homeController')
const { formNewVacant } = require('../controllers/vacanciesController')

module.exports = () => {
  router.get('/', showJobs)

  // create vacancies
  router.get('/vacancies/new', formNewVacant)

  return router
}
