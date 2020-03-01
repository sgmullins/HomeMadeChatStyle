const Meal = require('../../models/Meal');
const checkAuth = require('../../utils/check-auth');
const { AuthenticationError } = require('apollo-server');

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
  },
};
