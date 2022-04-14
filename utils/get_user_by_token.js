const jwt = require('jsonwebtoken');
const { db } = require('./db');

const getUserByToken = async (token) => {
  if(!token) {
    throw new Error("access denied.");
  };
  const decoded = jwt.verify(token, "1234");
  const userId = decoded.id;
  const user = await db('users').where('id', userId).first();
  return user;
};

module.exports = getUserByToken;