const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE)

    require('../models/vacancies')

    console.log('Database inline')
    return connection.getClient()
  } catch (error) {
    console.log(error)
    throw new Error('Error while connecting to Mongo')
  }
}

module.exports = {
  dbConnect
}
