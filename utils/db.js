require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');

const _config = knexConfig[process.env.NODE_ENV];

module.exports.db = knex(_config);