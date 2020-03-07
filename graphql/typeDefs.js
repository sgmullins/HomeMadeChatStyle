const { gql } = require('apollo-server');
//TODO: turn the category field into an enum of Breakfast lunch dinner allday....
module.exports = gql`
  type Meal {
    id: ID!
    title: String!
    category: String!
    description: String!
    username: String!
    madeDate: String!
    comments: [Comment]!
    likes: [Like]!
    amount: Int!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
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
    createComment(mealId: ID!, body: String!): Meal!
    deleteComment(mealId: ID!, commentId: ID!): Meal!
    likeMeal(mealId: ID!): Meal!
    purchaseMeal(mealId: ID!): Meal!
  }
  # subscription example
  type Subscription {
    mealAdded: Meal!
  }
`;
