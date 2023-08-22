
// model/User.js
require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  userId:{
    type:String,
    default: () => Date.now().toString(),
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.validatePassword =async function(userSendPassword){
  return await bcrypt.compare(userSendPassword, this.password)
}

// create and return jwt-token
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      userId: this.userId,
      username: this.username,
      isAdmin: this.isAdmin
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;






