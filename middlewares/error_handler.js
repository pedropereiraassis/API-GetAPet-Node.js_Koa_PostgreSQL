module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (!err.status) {
      ctx.status = 422;
      ctx.body = { message: err.message }
    } else {
      ctx.status = err.status;
      ctx.body = { message: err.message || "Internal server error" };
    }
    ctx.app.emit("error", err, ctx);
  };
};