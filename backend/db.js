const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: 'postgres',           // Replace with your actual PostgreSQL username
    host: 'localhost',
    database: 'hammertimeDB',         // Replace with your actual database name
    password: 'postgres',       // Replace with your actual password
    port: 5432,                     // Default PostgreSQL port
  });

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

module.exports = pool;