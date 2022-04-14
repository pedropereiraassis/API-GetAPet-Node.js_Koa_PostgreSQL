const createUserToken = require('../utils/create_user_token');
const usersService = require('../services/users.service');

const users = {
  register: async (ctx) => {
    const { name, email, phone, password, confirmPassword } = ctx.request.body;
    const user = await usersService.register(name, email, phone, password, confirmPassword);
    const authentication = await createUserToken(user);
    ctx.body = { user, authentication };
  },
  login: async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await usersService.login(email, password);
    ctx.body = await createUserToken(user);
  },
  checkUser: async (ctx) => {
    ctx.body = await usersService.checkUser(ctx.headers.authorization);
  },
  getUserById: async (ctx) => {
    const id = ctx.params.id;
    ctx.body = await usersService.getUserById(id);
  },
  updateUser: async (ctx) => {
    const id = ctx.params.id;
    const authHeader = ctx.headers.authorization;
    const { name, email, phone, password, confirmPassword } = ctx.request.body;
    const user = await usersService.updateUser(id, name, email, phone, password, confirmPassword, authHeader);
    ctx.body = { message: "user updated", user };
  }
};

module.exports = users;