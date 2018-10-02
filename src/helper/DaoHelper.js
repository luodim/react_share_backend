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
      host: '54.238.237.51',
      user: 'root',
      password: '122544',
      database: 'share_test_db',
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      port: '3306'
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
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = "4"
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = "-"
    let uuid = s.join("")
    return uuid
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
    let date = new Date().getTime()
    console.log(`date is ${date}`)
    valueArray.push(date)
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
  static mkDirs(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (this.mkDirs(path.dirname(dirname))) {
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

  /*
  组装返回结果为标准格式
  datalist: 返回结果中data字段的值
  fields:返回结果中的返回字段
  valueArray:返回结果中的各字段的值
  */
  static handleBuild(datalist, fields, valueArray, event, eventName) {
    valueArray = DaoHelper.setDataTime(valueArray, datalist)
    let json = DaoHelper.buildJson(fields, valueArray)
    event.emit(eventName, DaoHelper.buildJson(fields, valueArray))
  }

  // 根据location获取locationCode，待完善
  static getLocationCode(location) {
    // todo need a location code map table all of the world, include multiple language
  }

  // 处理dao中结果
  static handleDaoQuery(c, querySql, querySqlParams) {
    return new Promise((resolve, reject) => {
      c.query(querySql, querySqlParams, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
      c.end()
    }).catch(err => {
      console.log(err)
    })
  }
}