require('dotenv').config();
const path = require('path');
const BASE_PATH = path.join(__dirname, "db");

module.exports = {
  docker: {
    client: "postgresql",
    connection: {
      host: "get_pet_db",
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    },
  }
}