const { Pool } = require('pg');
const config = require('../config.json')

// Create a connection pool
const pool = new Pool({
  user: config.rds_user,
  host: config.rds_host,
  database: config.rds_db,
  password: config.rds_password,
  port: config.rds_port,
  ssl: {
    rejectUnauthorized: false // need to set this for security extra credit
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
