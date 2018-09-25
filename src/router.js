import TargetService from './service/TargetService.js'
import TaskService from './service/TaskService.js'
import UserService from './service/UserService.js'
import InvitationService from './service/InvitationService.js'
import DaoHelper from './helper/DaoHelper.js'

export default class Router {

  handleParams(pathname, params, body, ev) {
    this.ev = ev
    let service
    let event = DaoHelper.buildEvents()
    let eventName
    let invitationCode = params !== undefined ? params.invitation_code : body.invitation_code
    let userId = params !== undefined ? params.user_id : body.user_id
    let unionId = params !== undefined ? params.union_id : body.union_id
    let checkStatus = params !== undefined ? params.check_state : body.check_state
    let name = params !== undefined ? params.name : body.name
    let code = params !== undefined ? params.code : body.code
    let imgRes = params !== undefined ? params.img_res : body.img_res
    let imgResSmall = params !== undefined ? params.img_res_small : body.img_res_small
    let comment = params !== undefined ? params.comment : body.comment
    let contributor = params !== undefined ? params.contributor : body.contributor
    let fingerCode = params !== undefined ? params.finger_code : body.finger_code
    let sinceId = params !== undefined ? params.since_id : body.since_id
    let pageNum = params !== undefined ? params.page_num : body.page_num
    let location = params !== undefined ? params.location : body.location
    switch (pathname) {
      case '/api/login':
        service = new UserService()
        eventName = 'veridfyIdCB'
        this.bindEvent(event, eventName)
        service.verifyLogin(invitationCode, fingerCode, event, eventName)
        break
      case '/api/home': // 获取首页数据
        service = new TargetService()
        eventName = 'getHomeDataListCB'
        this.bindEvent(event, eventName)
        service.getTargetList(sinceId, userId, event, eventName, pageNum)
        break
      case '/api/task': // 获取任务列表
        service = new TaskService()
        eventName = 'getTaskDataListCB'
        this.bindEvent(event, eventName)
        service.getTaskList(userId, event, eventName)
        break
      case '/api/task-update': // 更新任务列表状态（完成/未完成）
        service = new TaskService()
        eventName = 'updateTaskCB'
        this.bindEvent(event, eventName)
        service.updateTask(userId, unionId, checkStatus, event, eventName)
        break
      case '/api/task-del': // 删除任务
        service = new TaskService()
        eventName = 'delTaskCB'
        this.bindEvent(event, eventName)
        service.deleteTask(userId, unionId, event, eventName)
        break
      case '/api/task-add': // 添加任务
        service = new TaskService()
        eventName = 'addTaskCB'
        this.bindEvent(event, eventName)
        service.addTask(userId, unionId, event, eventName)
        break
      case '/api/upload-data': // 上传目标数据
        service = new TargetService()
        eventName = 'uploadTargetCB'
        this.bindEvent(event, eventName)
        service.uploadTargetData(name, code, imgRes, imgResSmall, comment, contributor, location, event, eventName)
        break
      case '/api/user-info': // 获取用户数据
        service = new UserService()
        eventName = 'getUserInfoCB'
        this.bindEvent(event, eventName)
        service.getUserInfo(userId, event, eventName)
        break
      case '/api/invitation-code-add': // 添加邀请码
        service = new InvitationService()
        eventName = 'addInvitationCodeCB'
        this.bindEvent(event, eventName)
        service.addInvitationCode(userId, event, eventName)
        break
      case '/api/invitaiton-list': // 获取邀请码列表
        service = new InvitationService()
        eventName = 'getInvitationListCB'
        this.bindEvent(event, eventName)
        service.getInvitationCodesByUserId(userId, event, eventName)
        break
      case '/api/available-invitation': // 获取可用邀请码
        service = new InvitationService()
        eventName = 'getAvailableInvitationCodeCB'
        this.bindEvent(event, eventName)
        service.getAvailableInvitationCodeByUserId(userId, event, eventName)
        break
    }
  }

  bindEvent(event, eventName) {
    event.on(eventName, result => {
      if (this.ev) {
        this.ev.emit('serviceCB', JSON.stringify(result))
      }
    })
  }
}