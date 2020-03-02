const mealResolvers = require('./meals');
const userResolvers = require('./users');
const commentResolvers = require('./comments');

module.exports = {
  // this is a bit of a modifier, it will take the parent(the mutation being run) and anytime something goes through it will run these modifiers and return options
  Meal: {
    likeCount(parent) {
      // console.log(parent)
      return parent.likes.length;
    },
    commentCount: parent => parent.comments.length,
  },
  Query: {
    ...mealResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...mealResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...mealResolvers.Subscription,
  },
};
