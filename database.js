const mysql = require('mysql2');
// import des chemins
require('dotenv').config({path: '.env'})
module.exports = mysql.createConnection({
  host: 'localhost',
  user: '(process.env.DB_USER)',
  password: '(process.env.DB_PASSWORD)',
  database: '(process.env.DB_DATABASE)',
});