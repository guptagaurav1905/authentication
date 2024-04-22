const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool