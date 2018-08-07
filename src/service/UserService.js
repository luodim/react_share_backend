import UserDao from '../dao/UserDao.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class UserService {

  /*
  添加user id
  admin权限,可批量化操作
  */
  addUserId(userIdArray, e, en) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'addUserDaoCB'
    let fieldArray
    let valueArray = []
    let dataList = []
    event.on(eventName, (result) => {
      fieldArray = ['message', 'status', 'data', 'timestamp']
      if (result && result['affectedRows']) {
        DaoHelper.setStatusMessage(valueArray, true)
      } else {
        DaoHelper.setStatusMessage(valueArray, false)
      }
      DaoHelper.setDataTime(valueArray, dataList)
      e.emit(en, DaoHelper.buildJson(fieldArray, valueArray))
    })
    user.addUserId(userIdArray, event, eventName)
  }

  /*
  根据userId参数删除对应userId
  admin权限，可批量化操作
  */
  deleteUserId(userIdArray, e, en) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'delUserDaoCB'
    let fieldArray
    let valueArray = []
    let dataList = []
    event.on(eventName, result => {
      fieldArray = ['message', 'status', 'data', 'timestamp']
      if (result && result['affectedRows']) {
        DaoHelper.setStatusMessage(valueArray, true)
      } else {
        DaoHelper.setStatusMessage(valueArray, false)
      }
      DaoHelper.setDataTime(valueArray, dataList)
      e.emit(en, DaoHelper.buildJson(fieldArray, valueArray))
    })
    user.deleteUserId(userIdArray, event, eventName)
  }

  /*
  更新user id数值
  admin权限，可批量化操作
  */
  updateUserId(curUserIdArray, newUserIdArray, e, en) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'updateUserDaoCB'
    let fieldArray
    let valueArray = []
    let dataList = []
    event.on(eventName, result => {
      fieldArray = ['message', 'status', 'data', 'timestamp']
      if (result && result['affectedRows']) {
        DaoHelper.setStatusMessage(valueArray, true)
      } else {
        DaoHelper.setStatusMessage(valueArray, false)
      }
      DaoHelper.setDataTime(valueArray, dataList)
      e.emit(en, DaoHelper.buildJson(fieldArray, valueArray))
    })
    user.updateUserId(curUserIdArray, newUserIdArray, event, eventName)
  }

  /*
  验证传入的userId是否有效（是否在user table）
  */
  verifyUserId(userId, e, en) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'quertUserDaoCB'
    let valueArray = []
    let dataList = []
    let fields
    event.on(eventName, (result) => {
      fields = ['message', 'status', 'isValid', 'data', 'timestamp']
      if (result && Object.keys(result).length > 0) {
        valueArray = DaoHelper.setStatusMessage(valueArray, true)
        valueArray.push(true)
        if (!result[0]['invation_code'] || result[0]['invation_code'] === '') {
          // 首次登陆检验，更新邀请码
          user.updateInvationCode(DaoHelper.getUUID(), userId)
        }
      } else {
        valueArray = DaoHelper.setStatusMessage(valueArray, false)
        valueArray.push(false)
      }
      dataList.push(result[0])
      DaoHelper.setDataTime(valueArray, dataList)
      e.emit(en, DaoHelper.buildJson(fields, valueArray))
    })
    user.verifyUserId(userId, event, eventName)
  }
}