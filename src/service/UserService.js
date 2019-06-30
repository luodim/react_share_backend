import UserDao from '../dao/UserDao.js'
import InvitationDao from '../dao/InvitationDao.js'
import InvitationService from './InvitationService.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class UserService {

  /*
  根据userId获取用户信息
  userId:用户id
  event:回调事件
  eventName:回调事件名称
  */
  async getUserInfo(userId, event, eventName) {
    let dao = new UserDao()
    let valueArray = []
    let datalist = []
    let fields = ['message', 'status', 'data', 'timestamp']

    let result = await dao.getUserInfoByUserId(userId)
    if (result && result.length > 0) {
      datalist = datalist.concat(result)
      valueArray = DaoHelper.setStatusMessage(valueArray, true)
    } else {
      valueArray = DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
  }

  /*
  登录校验
  invitationCode:输入的邀请码
  fingerCode:设备码
  event:回调事件
  eventName:回调事件名称
  */
  async verifyLogin(invitationCode, fingerCode, event, eventName) {
    let dao = new UserDao()
    let valueArray = []
    let datalist = []
    let fields = ['message', 'status', 'data', 'timestamp']
    let maxUserNum = 100

    let result = await dao.getUserInfoByInvitationCode(invitationCode)
    if (result && result.length > 0) { // 用户存在
      // let isValidDev = result[0].finger_code === fingerCode
      datalist.push(result[0])
      valueArray = DaoHelper.setStatusMessage(valueArray, true)
      // if (isValidDev) { // 设备码能够匹配
      //   valueArray = DaoHelper.setStatusMessage(valueArray, true)
      // } else { // 设备码不匹配
      //   valueArray = DaoHelper.setStatusMessage(valueArray, false, '测试阶段为了减轻服务器压力仅支持单设备登录，请使用首次注册所用设备登录')
      // }
      DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)

    } else  { // 用户不存在，查询邀请码是否存在于邀请码列表
      let dao2 = new InvitationDao()
      let result2 = await dao2.getInvitationInfoByCode(invitationCode)
      if (result2 && result2.length > 0) { // 邀请码在表中存在
        // 查询已注册用户数
        let result3 = await dao.getUserList()
        console.log(result3.length)
        if (result3 && result3.length >= maxUserNum) { // 如果数值超过阈值则不执行创建新用户操作
          valueArray = DaoHelper.setStatusMessage(valueArray, false, '已达注册用户上限，无法创建新账户')
          DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
        } else { // 创建新用户
          let userId = DaoHelper.getUUID()
          let nickname = DaoHelper.genNickname()
          let result4 = await dao.addUser(userId, invitationCode, fingerCode, nickname)
          console.log(result4)
          if (result4 && result4['affectedRows']) { // 新用户创建成功
            valueArray = DaoHelper.setStatusMessage(valueArray, true, '创建新用户成功')
            datalist.push({user_id:userId, nickname:nickname, invitation_related:invitationCode, finger_code:fingerCode})
            //---------------------------------------------------------------------------------------------------------------------
            // 创建新用户成功，生成此用户的邀请码并添加到邀请码表中
            let invitationService = new InvitationService()
            invitationService.addInvitationCode(userId, DaoHelper.buildEvents(), 'invitationCodeAddCB')
            // 更新创建此账户使用的邀请码的使用状态
            invitationService.updateInvitationCodeUseState(invitationCode, true, DaoHelper.buildEvents(), 'invitationCodeUpdateCB')
            // 为提供邀请码使此新用户注册成功的账户创建新的邀请码
            let result = await dao2.getUserIdByInvitationCode(invitationCode)
            console.log(result)
            console.log(result[0].user_id)
            if (result && result[0] && result[0].user_id) invitationService.addInvitationCode(result[0].user_id, DaoHelper.buildEvents(), 'invitationCodeAddCB')
            //---------------------------------------------------------------------------------------------------------------------
          } else { // 新用户创建失败
            valueArray = DaoHelper.setStatusMessage(valueArray, false, '创建新用户失败，请重试')
          }
          DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
        }
      } else { // 无效邀请码
        valueArray = DaoHelper.setStatusMessage(valueArray, false, '无效邀请码，请重新输入')
        DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
      }
    }
  }

}