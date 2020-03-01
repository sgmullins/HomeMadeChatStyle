const mealResolvers = require('./meals');
const userResolvers = require('./users');

module.exports = {
  Query: {
    ...mealResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...mealResolvers.Mutation,
  },
};
