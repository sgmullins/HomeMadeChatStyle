const { AuthenticationError, UserInputError } = require('apollo-server');
const checkAuth = require('../../utils/check-auth');

const Meal = require('../../models/Meal');

module.exports = {
  Mutation: {
    async createComment(_, { mealId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Comment is empty', {
          errors: {
            body: 'Comment body can not be empty',
          },
        });
      }
      const meal = await Meal.findById(mealId);
      if (meal) {
        meal.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await meal.save();
        return meal;
      } else throw new UserInputError('Meal not found');
    },
    async deleteComment(_, { mealId, commentId }, context) {
      const { username } = checkAuth(context);
      const meal = await Meal.findById(mealId);

      if (meal) {
        const commentIndex = meal.comments.findIndex(c => c.id === commentId);

        if (meal.comments[commentIndex].username === username) {
          meal.comments.splice(commentIndex, 1);
          await meal.save();
          return meal;
        } else {
          throw new AuthenticationError('Deleting this comment is not allowed');
        }
      } else {
        throw new UserInputError('Meal not found');
      }
    },
  },
};
