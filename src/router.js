import TargetService from './service/TargetService.js'
import TaskService from './service/TaskService.js'
import UserService from './service/UserService.js'
import DaoHelper from './helper/DaoHelper.js'

export default class Router {

  handleParams(pathname, params, res) {
  	let target
  	let task
  	let user
  	let event = DaoHelper.buildEvents()
  	let eventName
    switch (pathname) {
	  case '/api/login':
	    if (params) {
          user = new UserService()
          eventName = 'veridfyIdCB'
          this.bindEvent(event, eventName)
          user.verifyUserId(params.user_id, event, eventName)
	    }
	    break
	  case '/api/home':
	    if (params) {
	      target = new TargetService()
	      eventName = 'getHomeDataListCB'
	      this.bindEvent(event, eventName)
	      target.getTargetList(1, 10, params.user_id, event, eventName)
	    }
	    break
	  case '/api/task':
	    if (params) {
	      task = new TaskService()
	      eventName = 'getTaskDataListCB'
	      this.bindEvent(event, eventName)
	      task.getTaskList(params.user_id, event, eventName)
	    }
	    break
	  case '/api/task-update':
	    if (params) {
	      task = new TaskService()
	      eventName = 'updateTaskCB'
	      this.bindEvent(event, eventName)
	      task.updateTask(params.user_id, params.union_id, params.check_state, event, eventName)
	    }
	    break
	  case '/api/upload-data':
	    if (params) {
	      target = new TargetService()
	      eventName = 'uploadTargetCB'
	      this.bindEvent(event, eventName)
	      target.uploadTargetData(params.name, params.code, params.imgs, params.imgb, params.comment, params.contributor, event, eventName)
	    }
	    break
    }
  }

  bindEvent(event, eventName) {
  	if (event) {
      event.on(eventName, result => {
        this.handleEventCB(result)
      })
  	}
  }

  handleEventCB(result) {
    console.log(result)
  }
}