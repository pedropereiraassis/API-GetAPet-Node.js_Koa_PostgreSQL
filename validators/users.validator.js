const { validateBodyWithSchema } = require('./base.validator');

const validateUserRegister = validateBodyWithSchema({
  type: "object",
  required: ["name", "email", "phone", "password", "confirmPassword"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    password: { type: "string" },
    confirmPassword: { type: "string" },
  },
});

const validateUserLogin = validateBodyWithSchema({
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
});

const validateUserUpdate = validateBodyWithSchema({
  type: "object",
  required: ["name", "email", "phone"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    password: { type: "string" },
    confirmPassword: { type: "string" },
  },
})

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateUserUpdate,
};