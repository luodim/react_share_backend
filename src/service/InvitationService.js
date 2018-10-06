import InvitationDao from '../dao/InvitationDao.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class InvitationService {

  /*
  生成邀请码并添加到数据库
  userId:用户id
  event:回调事件
  eventName:回调事件名
  */
  async addInvitationCode(userId, event, eventName) {
    let dao = new InvitationDao()
    let invitationCode = DaoHelper.getUUID()
    let fields = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    let result = await dao.addInvitationCode(invitationCode, userId)
    if (result && result['affectedRows']) {
      valueArray = DaoHelper.setStatusMessage(valueArray, true)
      datalist.push({user_id: userId, invitation_code: invitationCode})
    } else {
      valueArray = DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
  }

  /*
  通过用户id获取该id所生成的全部邀请码
  userId:用户ID
  event:回调事件
  eventName:回调事件名
  */
  async getInvitationCodesByUserId(userId, event, eventName) {
    let dao = new InvitationDao()
    let fields = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []

    let result = await dao.getInvitationCodesByUserId(userId)
    if (result) {
      valueArray = DaoHelper.setStatusMessage(valueArray, true)
      datalist = datalist.concat(result)
    } else {
      valueArray = DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
  }

  /*
  获取可用邀请码（即未被使用过的邀请码）
  userId:用户id
  */
  async getAvailableInvitationCodeByUserId(userId, event, eventName) {
    let dao = new InvitationDao()
    let fields = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []

    let result = await dao.getAvailableInvitationCodeByUserId(userId)
    if (result && result.length > 0) { // 存在可用的邀请码
      valueArray = DaoHelper.setStatusMessage(valueArray, true)
      datalist = datalist.concat(result)
    } else { // 不存在可用的邀请码
      // 为此userId生成一个新的可用邀请码
      let newInvitationCode = DaoHelper.getUUID()
      let result2 = await dao.addInvitationCode(newInvitationCode, userId)
      if (result2 && result2['affectedRows']) {
        valueArray = DaoHelper.setStatusMessage(valueArray, true)
        datalist.push({user_id: userId, invitation_code: newInvitationCode})
      } else {
        valueArray = DaoHelper.setStatusMessage(valueArray, false)
      }
    }
    DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
  }

  /*
  更新邀请码使用状态
  invitationCode:被更新的邀请码
  state:更新状态[0:未使用, 1:已使用]
  */
  async updateInvitationCodeUseState(invitationCode, state, event, eventName) {
    let dao = new InvitationDao()
    let fields = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    state = state==='true' ? 1 : 0;
    let result = await dao.updateInvitationCodeUseState(invitationCode, state)
    if (result && result['affectedRows']) {
      valueArray = DaoHelper.setStatusMessage(valueArray, true)
    } else {
      valueArray = DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
  }

  /*
  根据用户id更新邀请码数值
  newCode：更新的数据
  userId:用户id
  */
  async updateInvitationCode(userId, event, eventName) {
    let dao = new InvitationDao()
    let fields = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    let newCode = DaoHelper.getUUID()
    let result = await dao.updateInvitationCode(newCode, userId)
    if (result && result['affectedRows']) {
      valueArray = DaoHelper.setStatusMessage(valueArray, true)
      datalist.push({user_id: userId, invitation_code: newCode})
    } else {
      valueArray = DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
  }
}