const jwt = require('jsonwebtoken');

const createToken = user => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: '5h' },
  );
};

module.exports = createToken;
