const { Router } = require('express')
const router = Router()

const { showJobs } = require('../controllers/homeController')
const {
  formNewVacancy,
  addVacancy,
  showVacancy,
  formEditVacancy,
  editVacancy,
  validateVacancy,
  deleteVacancy,
  uploadCV,
  addCandidate,
  showCandidates
} = require('../controllers/vacanciesController')
const {
  formCreateAccount,
  confirmRegistration,
  addUser,
  formLogin,
  formEditProfile,
  editProfile,
  validateProfile,
  uploadImage
} = require('../controllers/usersController')

const {
  authenticateUser,
  isAuthenticated,
  showDashboard,
  formResetPassword,
  logout
} = require('../controllers/authController')

module.exports = () => {
  router.get('/', showJobs)

  // create vacancies
  router.get('/vacancies/new', isAuthenticated, formNewVacancy)
  router.post('/vacancies/new', isAuthenticated, validateVacancy, addVacancy)

  // Show vacancy
  router.get('/vacancies/:url', showVacancy)

  // edit vacancy
  router.get('/vacancies/edit/:url', isAuthenticated, formEditVacancy)
  router.post(
    '/vacancies/edit/:url',
    isAuthenticated,
    validateVacancy,
    editVacancy
  )

  // delete vacancy
  router.delete('/vacancies/delete/:id', deleteVacancy)

  // get message of candidates
  router.post('/vacancies/:url', uploadCV, addCandidate)

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
  router.post(
    '/edit-profile',
    isAuthenticated,
    // validateProfile,
    uploadImage,
    editProfile
  )

  // show candidates by vacancy
  router.get('/candidates/:id', isAuthenticated, showCandidates)

  // forgot password
  router.get('/reset-password', formResetPassword)

  // logout
  router.get('/logout', isAuthenticated, logout)

  return router
}
