import mysql from 'mysql'

export default class DaoHelper {
  constructor() {
  }

  static buildConnect() {
    return mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"122544",
      database:"share_test"
    })
  }

  static handleError(err) {
    if (err) {
      console.log(err.message)
      return true
    }
    return false
  }
}