const Meal = require('../../models/Meal');
const checkAuth = require('../../utils/check-auth');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    async getAllMeals() {
      try {
        const meals = await Meal.find().sort({ madeDate: -1 });
        return meals;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMeal(_, { mealId }) {
      try {
        const meal = await Meal.findById(mealId);
        if (meal) {
          return meal;
        } else {
          throw new Error('Meal not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createMeal(
      _,
      { mealInput: { title, category, description, amount } },
      context,
    ) {
      //validate the request headers
      const user = checkAuth(context);
      //Create a new meal. user is coming from the checkAuth(context) function.
      const newMeal = await Meal.create({
        title,
        category,
        description,
        amount,
        User: user.id,
        username: user.username,
        madeDate: new Date().toISOString(),
      });
      context.pubsub.publish('MEAL_ADDED', {
        mealAdded: newMeal,
      });
      return newMeal;
    },
    async deleteMeal(_, { mealId }, context) {
      const user = checkAuth(context);
      try {
        const meal = await Meal.findById(mealId);
        if (user.username === meal.username) {
          await meal.delete();
          return 'Meal Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not allowed, not your meal');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likeMeal(_, { mealId }, context) {
      const { username } = checkAuth(context);
      const meal = await Meal.findById(mealId);

      if (meal) {
        //if there is a meal and the meal's likes already has a username equal to the person logged in, remove the like
        if (meal.likes.find(like => like.username === username)) {
          //meal already liked
          meal.likes = meal.likes.filter(like => like.username !== username);
        } else {
          //not liked like post
          meal.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await meal.save();
        return meal;
      } else throw new UserInputError('Meal not found');
    },
  },
  Subscription: {
    mealAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('MEAL_ADDED'),
    },
  },
};
