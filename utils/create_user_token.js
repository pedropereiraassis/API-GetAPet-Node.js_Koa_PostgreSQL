const jwt = require('jsonwebtoken');

const createUsertoken = async (user) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id
    },
    "1234"
  );
  return { message: "user authenticated", token: token , userId: user.id };
};

module.exports = createUsertoken;