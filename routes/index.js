const { Router } = require('express')
const router = Router()

const { showJobs } = require('../controllers/homeController')
const {
  formNewVacant,
  addVacant,
  showVacant
} = require('../controllers/vacanciesController')

module.exports = () => {
  router.get('/', showJobs)

  // create vacancies
  router.get('/vacancies/new', formNewVacant)
  router.post('/vacancies/new', addVacant)

  // Show vacancy
  router.get('/vacancies/:url', showVacant)

  return router
}
