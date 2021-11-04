const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'pursepup_db',
    password: 'ForSchool21',
    port: 5432,
  });
  
module.exports = client;