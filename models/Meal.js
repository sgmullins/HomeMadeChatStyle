const mongoose = require('mongoose');
const { Schema } = mongoose;

const MealSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  allergens: {
    type: String,
  },
  ingredients: {
    type: String,
    // require: true,
  },
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  instructions: {
    type: String,
    // required: true,
  },
  amount: {
    type: Number,
    min: 1,
    required: true,
  },
  price: {
    type: String,
    // required: true,
  },
  madeDate: String,
  username: {
    //might need to convert this to a 'User ref'
    type: String,
  },
  location: {
    type: String,
    // require: true,
  },
  // geometry: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: false,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: false,
  //   },
  // },
  imageURL: {
    type: String,
    // required: true,
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;
