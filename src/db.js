const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',    // hoặc IP server
  database: 'CookMate',
  password: 'Vuongkhac370!',
  port: 5432,           // port mặc định PostgreSQL
});

module.exports = pool;
