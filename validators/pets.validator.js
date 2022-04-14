const { validateBodyWithSchema } = require('./base.validator');

const validatePetRegister = validateBodyWithSchema({
  type: "object",
  required: ["name", "age", "weight", "color"],
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    weight: { type: "string" },
    color: { type: "string" },
  },
});

const validatePetUpdate = validateBodyWithSchema({
  type: "object",
  required: ["name", "age", "weight", "color"],
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    weight: { type: "string" },
    color: { type: "string" },
  },
});

module.exports = {
  validatePetRegister,
  validatePetUpdate,
};