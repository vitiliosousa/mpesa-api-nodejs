const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',       // Se usar Docker, pode ser '127.0.0.1' ou o nome do service no docker-compose
  user: 'mpesa_user',
  password: 'mpesa_pass123',
  database: 'mpesa_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
