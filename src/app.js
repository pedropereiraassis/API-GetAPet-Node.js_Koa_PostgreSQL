const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const cors = require('koa2-cors');
const router = require('./router');
const app = new Koa();
const corsOptions = {
  origin: "*",
  allowMethods: ["GET", "POST", "PATCH", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization", "x-secret"],
};

app.use(cors(corsOptions));
app.use(koaLogger());
app.use(bodyParser());
app.use(router.routes());

module.exports = app;


