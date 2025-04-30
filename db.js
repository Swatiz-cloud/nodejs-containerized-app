const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'nodeapp'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;
