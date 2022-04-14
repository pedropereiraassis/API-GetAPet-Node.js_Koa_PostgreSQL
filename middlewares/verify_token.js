const jwt = require('jsonwebtoken');
const getToken = require('../utils/get_token');

const verifyToken = async (ctx, next) => {
  if(!ctx.headers.authorization) {
    ctx.throw(401, "access denied");
  };
  const token = getToken(ctx.headers.authorization);

  if(!token) {
    ctx.throw(401, "access denied");
  };

  try {
    const verified = jwt.verify(token, "1234");
    ctx.request.user = verified;
    await next();
  } catch (err) {
    ctx.throw(400, "invalid token");
  };
};

module.exports = verifyToken;