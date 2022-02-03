const { Router, response } = require('express')
const router = Router()

module.exports = () => {
  router.get('/', (req, res = response) => {
    res.send('Hello World!!')
  })

  return router
}
