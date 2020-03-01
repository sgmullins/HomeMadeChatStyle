const { gql } = require('apollo-server');

module.exports = gql`
  type Meal {
    id: ID!
    title: String!
    category: String!
    description: String!
    username: String!
    madeDate: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    joinDate: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input MealInput {
    title: String!
    category: String!
    description: String!
    amount: Int!
  }
  type Query {
    getAllMeals: [Meal]!
    getMeal(mealId: ID!): Meal
  }
  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(username: String!, password: String!): User!
    createMeal(mealInput: MealInput): Meal!
    deleteMeal(mealId: ID!): String!
  }
`;
