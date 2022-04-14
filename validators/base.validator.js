const Ajv = require('ajv');
const ajv = new Ajv();

const validateBodyWithSchema = (schema) => {
  return async(ctx, next) => {
    const is_valid = await ajv.validate(schema, ctx.request.body);

    if(!is_valid) {
      ctx.throw(400, JSON.stringify(ajv.errors[0].message, null, 2));
    };

    return await next();
  };
};

module.exports = {
  validateBodyWithSchema
};