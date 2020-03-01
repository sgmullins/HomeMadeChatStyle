const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joinDate: String,

  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Meal',
  },
  purchases: {
    type: [Schema.Types.ObjectId],
    ref: 'Meal',
  },
  allergies: [String],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
