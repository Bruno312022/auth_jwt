const { Sequelize } = require("sequelize");
require('dotenv').config({ path: "../.env"});

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    port: process.env.DB_PORT,
    storage: false
})

module.exports = sequelize;