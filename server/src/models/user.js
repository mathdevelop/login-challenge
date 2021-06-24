require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  lock: { type: Number, default: 0 }
});

userSchema.pre('save', async function(next) {
  if(this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('isLocked').get(function() {
  if(this.lock === 0) return false;

  const diff = Date.now() - this.lock,
        minutes = Math.floor((diff / 1000) / 60);

  if(minutes >= process.env.TOTAL_LOCK_MINUTES) return false;

  return true;
});

userSchema.virtual('hasAttempts').get(function() {
  if(this.attempts < process.env.MAXIMUM_NUMBER_ATTEMPTS) return true;

  return false;
});

const User = mongoose.model('User', userSchema);

module.exports = { User };