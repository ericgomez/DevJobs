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
  tokenExpires: Date
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

module.exports = model('User', UsersSchema)
