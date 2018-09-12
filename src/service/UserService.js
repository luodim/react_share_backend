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
      // 获取新增用户信息
      let ev0 = DaoHelper.buildEvents()
      let en0 = 'getNewUserInfoCB'
      ev0.on(en0, r => {
        if (r && Object.keys(r).length > 0) { // 指纹码存在
          if (r[0]) {dataList.push(r[0])}
        }
        DaoHelper.setDataTime(valueArray, dataList)
        e.emit(en, DaoHelper.buildJson(fieldArray, valueArray))
      })
      user.verifyFingerCode(fingerCode, ev0, en0)
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

  // 根据user id获取用户信息
  getUserInfo(userId, e, en) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'getUserInfoDaoCB'
    let fieldArray
    let valueArray = []
    let dataList = []
    event.on(eventName, result => {
      fieldArray = ['message', 'status', 'data', 'timestamp']
      if (result && Object.keys(result).length > 0) {
        this.cbBuild(valueArray, true, result, dataList, fieldArray, e, en)
      } else {
        this.cbBuild(valueArray, false, result, dataList, fieldArray, e, en)
      }
    })
    user.getUserInfo(userId, event, eventName)
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
      console.log(`value array is `, valueArray)
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
        console.log('finger code is exist')
        console.log('result is-----', result)
        this.cbBuild(valueArray, true, result, dataList, fieldArray, e, en)
      } else { // 指纹码不存在
        this.cbBuild(valueArray, false, result, dataList, fieldArray, e, en)
      }
    })
    user.verifyFingerCode(fingerCode, event, eventName)
  }

  // 查询邀请码
  verifyInvitationCode(invitationCode, fingerCode, e, en) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'queryInvitationRelatedCB'
    let valueArray = []
    let dataList = []
    let fields
    event.on(eventName, result => {
      fields = ['message', 'status', 'data', 'timestamp']
      if (result && Object.keys(result).length > 0) { // 邀请码通过invitation_code_related字段找到
        console.log('invitation code is valid')
        // 验证设备指纹=============================================================
        let ev0 = DaoHelper.buildEvents()
        let en0 = 'verifyFingerCodeServiceCB'
        ev0.on(en0, r0 => {
          if (r0 && r0.status === '200' && r0.data[0].invitation_code_related === invitationCode) { // 指纹码在数据库中存在且与其相关联邀请码与输入的邀请码一致
            this.cbBuild(valueArray, true, result, dataList, fields, e, en, '设备指纹码匹配成功')
          } else { // 指纹码不匹配
            this.cbBuild(valueArray, false, result, dataList, fields, e, en, '测试阶段为了减轻服务器压力仅支持单设备登录，请使用首次注册所用设备登录')
          }
        })
        this.verifyFingerCode(fingerCode, ev0, en0)
      } else { // 邀请码未能通过invitation_code_related字段找到~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // 查询invitation_code字段，能查到说明此邀请码还未注册账户，服务器生成新账户；无结果说明此为非法邀请码
        let ev4 = DaoHelper.buildEvents()
        let en4 = 'queryInvitationCB'
        ev4.on(en4, r4 => {
          if (r4 && Object.keys(r4).length > 0) {// 有结果，创建账户-----------------------------------------
            let ev3 = DaoHelper.buildEvents()
            let en3 = 'addNewUserCB'
            ev3.on(en3, r3 => {
              if (r3 && r3['status'] === '200') { // 创建新用户成功
                dataList = r3.data
                this.cbBuild(valueArray, true, r3, dataList, fields, e, en, '新用户创建成功')
              } else { // 创建新用户失败
                this.cbBuild(valueArray, false, r3, dataList, fields, e, en, '新用户创建失败，请重试')
              }
            })
            this.addUserId(DaoHelper.getUUID(), DaoHelper.getUUID(), invitationCode, fingerCode, ev3, en3)
          } else { // 无结果，非法验证码---------------------------------------------------------------------
            console.log('invitation code is invalid-----')
            this.cbBuild(valueArray, false, result, dataList, fields, e, en, '无效的邀请码，请重新输入')
          }
        })
        user.verifyInvitationCode(invitationCode, 'invitation', ev4, en4)
      }
    })
    user.verifyInvitationCode(invitationCode, 'invitation_related', event, eventName)
  }

  cbBuild(valueArray, isSuccess, result, dataList, fields, e, en, message) {
    valueArray = DaoHelper.setStatusMessage(valueArray, isSuccess, message)
    if (result[0]) {dataList.push(result[0])}
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