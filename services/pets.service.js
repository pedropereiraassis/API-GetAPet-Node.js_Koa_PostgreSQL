const { db } = require('../utils/db');
const { v4: uuid, validate } = require('uuid');
const getToken = require('../utils/get_token');
const getUserByToken = require('../utils/get_user_by_token');
const { getUserById } = require('../controllers/users.controller');

const getAll = async () => {
  const pets = await db('pets').select('*');
  return pets;
};

const register = async (name, age, weight, color, authHeader) => {
  const token = getToken(authHeader);
  const user = await getUserByToken(token);
  const available = true;
  const pet = await db('pets')
    .insert({ 
      id: uuid(), 
      name, 
      age, 
      weight, 
      color,
      user_id: user.id,
      available
  }).returning('*');
  return pet[0];
};

const getPetById = async (id) => {
  if (!validate(id)) {
    throw new Error("invalid id.");
  };

  const pet = await db('pets').where('id', id).first();

  if(!pet) {
    throw new Error("pet not found.");
  };
  return pet;
};

const updatePet = async (id, name, age, weight, color, available, authHeader) => {
  if(!validate(id)) {
    throw new Error("invalid id.");
  };

  const pet = await db('pets').where('id', id).first();

  if(!pet) {
    throw new Error("pet not found.");
  };

  const token = getToken(authHeader);
  const user = await getUserByToken(token);

  if(user.id !== pet.user_id) {
    throw new Error("error, try again later.");
  };

  const [petUpdated] = await db('pets')
    .where('id', id)
    .update({
      name,
      age,
      weight, 
      color,
      available
    })
    .returning('*');
  return petUpdated;
};

const deletePet = async (id, authHeader) => {
  if(!validate(id)) {
    throw new Error("invalid id.");
  };

  const pet = await db('pets').where('id', id).first();

  if(!pet) {
    throw new Error("pet not found.");
  };

  const token = getToken(authHeader);
  const user = await getUserByToken(token);

  if(user.id !== pet.user_id) {
    throw new Error("error, try again later.");
  };

  await db('pets').where('id', id).del();
  return;
};

const getAllByUserId = async (authHeader) => {
  const token = getToken(authHeader);
  const user = await getUserByToken(token);
  const pets = await db('pets').where('user_id', user.id);
  return pets;
};

const schedule = async (id, authHeader) => {
  if(!validate(id)) {
    throw new Error("invalid id.");
  };

  const pet = await db('pets').where('id', id).first();

  if(!pet) {
    throw new Error("pet not found.");
  };

  const token = getToken(authHeader);
  const user = await getUserByToken(token);

  if(user.id === pet.user_id) {
    throw new Error("you can't schedule a visit with your own pet.");
  };

  if(pet.adopter_id === user.id) {
    throw new Error("you've already scheduled a visit with this pet.");
  };

  await db('pets')
    .where('id', id)
    .update({
      adopter_id: user.id
    });
  return { message: `visit schedule, contact ${user.name} by the phone ${user.phone}.` };
};

const getAdoptionsByUserId = async (authHeader) => {
  const token = getToken(authHeader);
  const user = await getUserByToken(token);
  const adoptions = await db('pets').where('adopter_id', user.id);
  return adoptions;
};

const concludeAdoption = async (id, authHeader) => {
  if(!validate(id)) {
    throw new Error("invalid id.");
  };

  const token = getToken(authHeader);
  const user = await getUserByToken(token);
  const pet = await db('pets').where('id', id).first();

  if(!pet) {
    throw new Error("pet not found.");
  };

  if(user.id !== pet.user_id) {
    throw new Error("error, try again later.");
  };

  pet.available = false;
  await db('pets')
    .where('id', id)
    .update({
      available: pet.available
    });
  return { message: "congrats, pet adopted." };
};

module.exports = {
  getAll,
  register,
  getPetById,
  updatePet,
  deletePet,
  getAllByUserId,
  getAdoptionsByUserId,
  schedule,
  concludeAdoption,
};