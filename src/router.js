import TargetService from './service/TargetService.js'
import TaskService from './service/TaskService.js'
import UserService from './service/UserService.js'
import DaoHelper from './helper/DaoHelper.js'

export default class Router {

  handleParams(pathname, params, body, ev) {
    this.ev = ev
  	let target
  	let task
  	let user
  	let event = DaoHelper.buildEvents()
  	let eventName
    let invitationCode = params !== undefined ? params.invitation_code : body.invitation_code
  	let userId = params !== undefined ? params.user_id : body.user_id
  	let unionId = params !== undefined ? params.union_id : body.union_id
  	let checkStatus = params !== undefined ? params.check_state : body.check_state
  	let name = params !== undefined ? params.name : body.name
  	let code = params !== undefined ? params.code : body.code
  	let imgRes = params !== undefined ? params.img_res : body.img_res
  	let comment = params !== undefined ? params.comment : body.comment
  	let contributor = params !== undefined ? params.contributor : body.contributor
    let fingerCode = params !== undefined ? params.fingerCode : body.finger_code
    switch (pathname) {
	  case '/api/login':
      user = new UserService()
      eventName = 'veridfyIdCB'
      this.bindEvent(event, eventName)
      user.verifyInvitationCode(invitationCode, fingerCode, event, eventName)
	    break
	  case '/api/home': // 获取首页数据
	    target = new TargetService()
	    eventName = 'getHomeDataListCB'
	    this.bindEvent(event, eventName)
	    target.getTargetList(1, 10, userId, event, eventName)
	    break
	  case '/api/task': // 获取任务列表
	    task = new TaskService()
	    eventName = 'getTaskDataListCB'
	    this.bindEvent(event, eventName)
	    task.getTaskList(userId, event, eventName)
	    break
	  case '/api/task-update': // 更新任务列表状态（完成/未完成）
	    task = new TaskService()
	    eventName = 'updateTaskCB'
	    this.bindEvent(event, eventName)
	    task.updateTask(userId, unionId, checkStatus, event, eventName)
	    break
    case '/api/task-del': // 删除任务
      task = new TaskService()
      eventName = 'delTaskCB'
      this.bindEvent(event, eventName)
      task.deleteTask(userId, unionId, event, eventName)
      break
    case '/api/task-add': // 添加任务
      task = new TaskService()
      eventName = 'addTaskCB'
      this.bindEvent(event, eventName)
      task.addTask(userId, unionId, event, eventName)
      break
	  case '/api/upload-data': // 上传目标数据
	    target = new TargetService()
	    eventName = 'uploadTargetCB'
	    this.bindEvent(event, eventName)
	    target.uploadTargetData(name, code, imgRes, comment, contributor, event, eventName)
	    break
    }
  }

  bindEvent(event, eventName) {
  	if (event) {
      event.on(eventName, result => {
        if (this.ev) {
          this.ev.emit('serviceCB', JSON.stringify(result))
        }
      })
  	}
  }
}