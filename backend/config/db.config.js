"use strict";
require("dotenv").config();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST || "192.168.1.118",
    port: process.env.DB_PORT || "3307",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "jhcisdb_77511",
  },
  debug: true,
  pool: { min: 0, max: 7 },
});

module.exports = knex;
