import mysql from 'mysql'

export default class DaoHelper {
  constructor() {
  }

  static buildEvents() {
     let events = require('events')
     return new events.EventEmitter()
  }

  static buildConnect() {
    return mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"122544",
      database:"share_test"
    })
  }

  static handleError(err, event, eventName) {
    if (err) {
      console.log(err.message)
      event.emit(eventName, err)
      return true
    }
    return false
  }

  static getUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  }

  static buildJson(fieldArray, valueArray) {
    let json = {}
    for (let i = 0; i < fieldArray.length; i++) {
      json[fieldArray[i]] = valueArray[i]
    }
    Object.keys(json).map(value => {
      if (value === 'data') {
        let obj = json[value]
        console.log(`equal data, data is ${obj}`)
        console.log(`obj length is ${obj.length}`)
        Object.keys(obj).map(v => {
          console.log(`data ${v}:${obj[v]}`)
        })
      }
      console.log(`json ${value}:${json[value]}`)
    })
    return json
  }
}