const { Router } = require('express')
const router = Router()

const { showJobs } = require('../controllers/homeController')
const {
  formNewVacant,
  addVacant,
  showVacant,
  formEditVacant,
  editVacant
} = require('../controllers/vacanciesController')
const {
  formCreateAccount,
  confirmRegistration,
  addUser,
  formLogin
} = require('../controllers/usersController')

const { authenticateUser } = require('../controllers/authController')

module.exports = () => {
  router.get('/', showJobs)

  // create vacancies
  router.get('/vacancies/new', formNewVacant)
  router.post('/vacancies/new', addVacant)

  // Show vacancy
  router.get('/vacancies/:url', showVacant)
  router.get('/vacancies/edit/:url', formEditVacant)
  router.post('/vacancies/edit/:url', editVacant)

  // create account
  router.get('/create-account', formCreateAccount)
  router.post('/create-account', confirmRegistration, addUser)

  // user auth
  router.get('/login', formLogin)
  router.post('login', authenticateUser)

  return router
}
