const { Router, response } = require('express')
const router = Router()

const { showJobs } = require('../controllers/homeController')

module.exports = () => {
  router.get('/', showJobs)

  return router
}
