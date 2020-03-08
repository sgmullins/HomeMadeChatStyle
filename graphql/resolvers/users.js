const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server');
const {
  validateRegisterUserInputs,
  validateUserLoginInputs,
} = require('../../utils/validators');
const createToken = require('../../utils/tokenCreation');

module.exports = {
  Query: {
    async getCurrentUser(_, { userId }, context) {
      try {
        const currentUser = await await User.findById(userId).populate({
          path: 'favorites',
          model: 'Meal',
        });
        console.log('current user from resolver', currentUser);
        if (currentUser) {
          return currentUser;
        } else {
          throw new Error('User not found from user resolver');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async registerUser(
      _,
      { registerInput: { username, email, password, confirmPassword } },
    ) {
      //Validate user input fields
      const { valid, errors } = validateRegisterUserInputs(
        username,
        email,
        password,
        confirmPassword,
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      //Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is already taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }
      //hash password and create auth token
      password = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        username,
        password,
        email,
        joinDate: new Date().toISOString(),
      });

      const token = createToken(newUser);

      return {
        ...newUser._doc,
        id: newUser._id,
        token,
      };
    },
    async loginUser(_, { username, password }) {
      const { valid, errors } = validateUserLoginInputs(username, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError('Invalid credentials', {
          errors: {
            general: 'User not Found',
          },
        });
      }
      const matchPasswords = bcrypt.compareSync(password, user.password);
      if (!matchPasswords) {
        throw new UserInputError('Invalid credentials', {
          errors: {
            general: 'Invalid Creds',
          },
        });
      }
      const token = createToken(user);
      console.log('from login mutation', user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
