const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const checkAuth = context => {
  //contex = {...headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //Bearer ...
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        console.log('user from auth context', user);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid or expired token ');
      }
    }
    throw new Error(
      'Authentication token must be formatted correctly as Bearer token',
    );
  }
  throw new Error('Authorization header must be provided');
};

module.exports = checkAuth;
