import UserDao from '../dao/UserDao.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class UserService {

  /*
  添加新账户
  admin权限,可批量化操作
  */
  addUserId(userId, invitationCode, invitationCodeRelated, fingerCode, e, en) {
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
    user.addUserId(userId, invitationCode, invitationCodeRelated, fingerCode, event, eventName)
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

  // 查询指纹码有效性
  verifyFingerCode(fingerCode, e, en) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'verifyFingerCodeCB'
    let fieldArray
    let valueArray = []
    let dataList = []
    event.on(eventName, result => {
      fieldArray = ['message', 'status', 'data', 'timestamp']
      if (result && Object.keys(result).length > 0) { // 指纹码存在
        this.cbBuild(valueArray, true, result, dataList, fields, e, en)
      } else { // 指纹码不存在
        this.cbBuild(valueArray, false, result, dataList, fields, e, en)
      }
    })
  }

  // 查询邀请码
  verifyInvitationCode(invitationCode, fingerCode, e, en) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'quertInvitationCodeCB'
    let valueArray = []
    let dataList = []
    let fields
    event.on(eventName, result => {
      fields = ['message', 'status', 'isValid', 'data', 'timestamp']
      if (result && Object.keys(result).length > 0) { // 邀请码有效
        // 查询是否存在使用此邀请码注册的账号------------------------------------------------
        let ev2 = DaoHelper.buildEvents()
        let en2 = 'queryInvitationRelatedCB'
        ev2.on(en2, r => {
          if (r && Object.keys(r).length > 0) { // 账户存在
            // 验证设备指纹=============================================================
            let ev0 = DaoHelper.buildEvents()
            let en0 = 'verifyFingerCodeServiceCB'
            ev0.on(en0, rrr => {
              if (rrr && rrr.status === '200') { // 指纹码匹配
                this.cbBuild(valueArray, true, r, dataList, fields, e, en, '设备指纹码匹配成功')
              } else { // 指纹码不匹配
                this.cbBuild(valueArray, false, r, dataList, fields, e, en, '测试阶段为了减轻服务器压力仅支持单设备登录，请使用首次注册所用设备登录')
              }
            })
            this.verifyFingerCode(fingerCode, ev0, en0)
          } else { // 账户不存在，新建账户~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            let ev3 = DaoHelper.buildEvents()
            let en3 = 'addNewUserCB'
            ev3.on(ev3, rr => {
              if (rr && rr['status'] === '200') { // 创建新用户成功
                this.cbBuild(valueArray, true, r, dataList, fields, e, en, '新用户创建成功')
              } else { // 创建新用户失败
                this.cbBuild(valueArray, false, r, dataList, fields, e, en, '新用户创建失败，请重试')
              }
            })
            this.addUserId(DaoHelper.getUUID(), DaoHelper.getUUID(), invitationCode, fingerCode, ev3, en3)
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        })
        user.verifyInvitationCode(invitationCode, 'invitation_related', ev2, en2)
        //-----------------------------------------------------------------------------
      } else { // 邀请码无效
        this.cbBuild(valueArray, false, result, dataList, fields, e, en, '无效的邀请码，请重新输入')
      }
    })
    user.verifyInvitationCode(invitationCode, 'invitation', event, eventName)
  }

  cbBuild(valueArray, isSuccess, result, dataList, fields, e, en, message) {
    valueArray = DaoHelper.setStatusMessage(valueArray, isSuccess, message)
    valueArray.push(isSuccess)
    dataList.push(result[0])
    DaoHelper.setDataTime(valueArray, dataList)
    e.emit(en, DaoHelper.buildJson(fields, valueArray))
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
        if (!result[0]['invitation_code'] || result[0]['invitation_code'] === '') {
          // 首次登陆检验，更新邀请码
          user.updateinvitationCode(DaoHelper.getUUID(), userId)
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