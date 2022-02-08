const { Router } = require('express')
const router = Router()

const { showJobs } = require('../controllers/homeController')
const {
  formNewVacancy,
  addVacancy,
  showVacancy,
  formEditVacancy,
  editVacancy
} = require('../controllers/vacanciesController')
const {
  formCreateAccount,
  confirmRegistration,
  addUser,
  formLogin,
  formEditProfile
} = require('../controllers/usersController')

const {
  authenticateUser,
  isAuthenticated,
  showDashboard
} = require('../controllers/authController')

module.exports = () => {
  router.get('/', showJobs)

  // create vacancies
  router.get('/vacancies/new', isAuthenticated, formNewVacancy)
  router.post('/vacancies/new', isAuthenticated, addVacancy)

  // Show vacancy
  router.get('/vacancies/:url', showVacancy)
  router.get('/vacancies/edit/:url', isAuthenticated, formEditVacancy)
  router.post('/vacancies/edit/:url', isAuthenticated, editVacancy)

  // create account
  router.get('/create-account', formCreateAccount)
  router.post('/create-account', confirmRegistration, addUser)

  // user auth
  router.get('/login', formLogin)
  router.post('/login', authenticateUser)

  // management
  router.get('/management', isAuthenticated, showDashboard)

  // edit - profile
  router.get('/edit-profile', isAuthenticated, formEditProfile)

  return router
}
