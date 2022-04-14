const { v4: uuid, validate } = require('uuid');
const { db } = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getToken = require('../utils/get_token');
const getUserByToken = require('../utils/get_user_by_token');

const register = async (name, email, phone, password, confirmPassword) => {
  const userExists = await db('users').where('email', email).first();

  if(userExists) {
    throw new Error("email already in use.");
  };

  if(!confirmPassword) {
    throw new Error("you need to confirm your password.");
  };

  if(password !== confirmPassword) {
    throw new Error("passwords doesn't match.");
  };
  
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const [user] = await db('users').insert({
      id: uuid(),
      name,
      email,
      phone,
      password: hashedPassword,
  }).returning('*');
  user.password = undefined;
  return user;
};

const login = async (email, password) => {
  const user = await db('users').where('email', email).first();

  if(!user) {
    throw new Error("email not registered.");
  };
  const checkPassword = await bcrypt.compare(password, user.password);

  if(!checkPassword) {
    throw new Error("invalid password.");
  };
  return user;
};

const checkUser = async (authHeader) => {
  let currentUser;
  if (authHeader) {
    const token = getToken(authHeader);
    const decoded = jwt.verify(token, "1234");
    currentUser = await db('users').where('id', decoded.id).first();
    currentUser.password = undefined;
  } else {
    currentUser = null;
  };
  return currentUser;
};

const getUserById = async (id) => {
  if (!validate(id)) {
    throw new Error("invalid id.");
  };

  const user = await db('users').where('id', id).first();

  if(!user) {
    throw new Error("user not found");
  };
  user.password = undefined;

  return user;
};

const updateUser = async (name, email, phone, password, confirmPassword, id, authHeader) => {
  if (!validate(id)) {
    throw new Error("invalid id.");
  };

  const userExists = await db('users').where('id', id).first();
  if(!userExists) {
    throw new Error("user not found");
  };

  const token = getToken(authHeader);
  const user = await getUserByToken(token);
  const emailExists = await db('users').where('email', email).first();

  if(user.id !== userExists.id) {
    throw new Error("error, try again later.");
  };

  if(emailExists && user.email !== email) {
    throw new Error("email already in use.");
  };

  if(password != confirmPassword) {
    throw new Error("passwords doesn't match.");
  } else if(password === confirmPassword && password != null) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  };

  const [userUpdated] = await db('users')
    .where('id', id)
    .update({
      name,
      email,
      phone,
      password: user.password
    })
    .returning('*');
    userUpdated.password = undefined;
  return userUpdated;
};

module.exports = {
  register,
  login,
  checkUser,
  getUserById,
  updateUser,
};