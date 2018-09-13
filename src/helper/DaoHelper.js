import mysql from 'mysql'
import fs from 'fs'
import path from 'path'

export default class DaoHelper {

  // 生成event对象
  static buildEvents() {
     let events = require('events')
     return new events.EventEmitter()
  }

  // 生成数据库连接对象
  static buildConnect() {
    return mysql.createConnection({
      host:'54.238.237.51',
      user:'root',
      password:'122544',
      database:'share_test_db',
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      port:'3306'
    })
  }

  // 处理数据库操作error事件
  static handleError(err, event, eventName) {
    if (err) {
      console.log(err.message)
      event.emit(eventName, err)
      return true
    }
    return false
  }

  // 生成随机昵称
  static genNickname() {
    let nickname = []
    let source = 'abcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < 6; i++) {
      nickname[i] = source.substr(Math.floor(Math.random() * 26), 1)
    }
    return nickname.join('')
  }

  // 生成UUID
  static getUUID() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    let uuid = s.join("");
    return uuid;
  }

  // 组装数据
  static buildJson(fieldArray, valueArray) {
    let json = {}
    for (let i = 0; i < fieldArray.length; i++) {
      json[fieldArray[i]] = valueArray[i]
    }
    console.log('data length is', json['data'].length)
    return json
  }

  // 处理组装完成数据后的回调
  static handleEvent(result, event, eventName) {
    if (event) event.emit(eventName, result)
  }

  // 设置data及timestamp字段
  static setDataTime(valueArray, datalist) {
    valueArray.push(datalist)
    valueArray.push(new Date().getTime())
    return valueArray
  }

  // 设置状态及message字段
  static setStatusMessage(valueArray, isSuccess, m) {
    let message
    if (m && m !== '') {
      message = m
    } else {
      message = isSuccess ? 'success' : 'fail'
    }
    let status = isSuccess ? '200' : '400'
    valueArray.push(message)
    valueArray.push(status)
    return valueArray
  }

  // 创建多集目录
  static mkDirs (dirname) {
    if(fs.existsSync(dirname)){
      return true;
    } else {
        if(this.mkDirs(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
    }
  }

  // 获取相对路径
  static getRelativePath(path) {
    let p = ''
    if (path) {
      p = path.substring(path.lastIndexOf('/'), path.length)
    }
    return p
  }
}