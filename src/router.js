const Router = require('koa-router');
const compose = require('koa-compose');
const errorHandler = require('../middlewares/error_handler');
const petsController = require('../controllers/pets.controller');
const usersController = require('../controllers/users.controller');
const usersValidator = require('../validators/users.validator');
const petsValidator = require('../validators/pets.validator');
const verifyToken = require('../middlewares/verify_token');

module.exports = ((opts = {}) => {
  const router = new Router();
  // USERS ROUTES
  router
    .get('/users/checkUser', compose([errorHandler]), usersController.checkUser)
    .get('/users/:id', compose([errorHandler]), usersController.getUserById)
    .post('/users/register', compose([errorHandler, usersValidator.validateUserRegister]), usersController.register)
    .post('/users/login', compose([errorHandler, usersValidator.validateUserLogin]), usersController.login)
    .patch('/users/edit/:id', compose([verifyToken, errorHandler, usersValidator.validateUserUpdate]), usersController.updateUser);

  // PETS ROUTES
  router
    .get('/pets/mypets', compose([verifyToken, errorHandler]), petsController.getAllByUserId)
    .get('/pets/myadoptions', compose([verifyToken, errorHandler]), petsController.getAdoptionsByUserId)
    .get('/pets/:id', compose([errorHandler]), petsController.getPetById)
    .get('/pets', compose([errorHandler]), petsController.getAll)
    .post('/pets/create', compose([verifyToken, errorHandler, petsValidator.validatePetRegister]), petsController.register)
    .patch('/pets/schedule/:id', compose([verifyToken, errorHandler]), petsController.schedule)
    .patch('/pets/conclude/:id', compose([verifyToken, errorHandler]), petsController.concludeAdoption)
    .patch('/pets/:id', compose([verifyToken, errorHandler, petsValidator.validatePetUpdate]), petsController.updatePet)
    .del('/pets/:id', compose([verifyToken, errorHandler]), petsController.deletePet);

  return router;
})();