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
  	let userId = params !== undefined ? params.user_id : body.user_id
  	let unionId = params !== undefined ? params.union_id : body.union_id
  	let checkStatus = params !== undefined ? params.check_state : body.check_state
  	let name = params !== undefined ? params.name : body.name
  	let code = params !== undefined ? params.code : body.code
  	let imgs = params !== undefined ? params.imgs : body.imgs
  	let imgb = params !== undefined ? params.imgb : body.imgb
  	let comment = params !== undefined ? params.comment : body.comment
  	let contributor = params !== undefined ? params.contributor : body.contributor
    switch (pathname) {
	  case '/api/login':
	    console.log('login api is called')
      user = new UserService()
      eventName = 'veridfyIdCB'
      this.bindEvent(event, eventName)
      user.verifyUserId(userId, event, eventName)
	    break
	  case '/api/home':
	    console.log('home api is called')
	    target = new TargetService()
	    eventName = 'getHomeDataListCB'
	    this.bindEvent(event, eventName)
	    target.getTargetList(1, 10, userId, event, eventName)
	    break
	  case '/api/task':
	    console.log('task api is called')
	    task = new TaskService()
	    eventName = 'getTaskDataListCB'
	    this.bindEvent(event, eventName)
	    task.getTaskList(userId, event, eventName)
	    break
	  case '/api/task-update':
	    console.log('task update api is called')
	    task = new TaskService()
	    eventName = 'updateTaskCB'
	    this.bindEvent(event, eventName)
	    task.updateTask(userId, unionId, checkStatus, event, eventName)
	    break
	  case '/api/upload-data':
	    console.log('upload-data api is called')
	    target = new TargetService()
	    eventName = 'uploadTargetCB'
	    this.bindEvent(event, eventName)
	    target.uploadTargetData(name, code, imgs, imgb, comment, contributor, event, eventName)
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