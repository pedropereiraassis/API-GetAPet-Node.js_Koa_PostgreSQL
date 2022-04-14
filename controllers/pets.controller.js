const petsService = require('../services/pets.service')

const pets = {
  getAll: async(ctx) => {
    ctx.body = await petsService.getAll();
  },
  register: async (ctx) => {
    const { name, age, weight, color } = ctx.request.body;
    const authHeader = ctx.headers.authorization;
    const pet = await petsService.register(name, age, weight, color, authHeader);
    ctx.body = { message: "pet registered", pet };
  },
  getPetById: async (ctx) => {
    const id = ctx.params.id;
    ctx.body = await petsService.getPetById(id);
  },
  updatePet: async (ctx) => {
    const id = ctx.params.id;
    const { name, age, weight, color, available } = ctx.request.body;
    const authHeader = ctx.headers.authorization;
    const pet = await petsService.updatePet(id, name, age, weight, color, available, authHeader)
    ctx.body = { message: "pet updated", pet };
  },
  deletePet: async (ctx) => {
    const id = ctx.params.id;
    const authHeader = ctx.headers.authorization;
    await petsService.deletePet(id, authHeader);
    ctx.body = { message: "pet deleted" };
  },
  getAllByUserId: async (ctx) => {
    const authHeader = ctx.headers.authorization;
    ctx.body = await petsService.getAllByUserId(authHeader);
  },
  getAdoptionsByUserId: async (ctx) => {
    const authHeader = ctx.headers.authorization;
    ctx.body = await petsService.getAdoptionsByUserId(authHeader);
  },
  schedule: async(ctx) => {
    const id = ctx.params.id;
    const authHeader = ctx.headers.authorization;
    ctx.body = await petsService.schedule(id, authHeader);
  },
  concludeAdoption: async (ctx) => {
    const id = ctx.params.id;
    const authHeader = ctx.headers.authorization;
    ctx.body = await petsService.concludeAdoption(id, authHeader);
  },
};

module.exports = pets;