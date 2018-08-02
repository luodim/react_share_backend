const mysql = require('mysql')
const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"122544",
  database:"share_test"
})

connection.connect()

connection.query('SELECT * FROM home_table', function(err, rows, fields) {
  if (err) throw err
  console.log('The rows is: ', rows)
})

connection.end()

class QueryModule {
  constructor() {
  }
}