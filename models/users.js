const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UsersSchema = Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  token: String,
  tokenExpires: Date,
  image: String
})

// hash password before saving
UsersSchema.pre('save', async function (next) {
  // check if password is modified
  if (!this.isModified('password')) return next()

  // hash password
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

UsersSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already exists'))
  } else {
    // we go to the next middleware of error
    next(error)
  }
})

// Authenticated user
UsersSchema.methods = {
  // compare password
  comparePassword: async function (candidatePassword, next) {
    // compare password
    const isMatch = await bcrypt.compare(candidatePassword, this.password)

    return isMatch
  }
}

module.exports = model('User', UsersSchema)
