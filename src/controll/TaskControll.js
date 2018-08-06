import TaskService from '../service/TaskService.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class TaskControll {

  addTask(userId, unionId) {
  	let service = new TaskService()
    let event = DaoHelper.buildEvents()
    let eventName = 'addTaskServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.addTask(userId, unionId, event, eventName)
  }

  deleteTask(userId, unionId) {
  	let service = new TaskService()
    let event = DaoHelper.buildEvents()
    let eventName = 'delTaskServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.deleteTask(userId, unionId, event, eventName)
  }

  updateTask(userId, unionId, checkState) {
  	let service = new TaskService()
    let event = DaoHelper.buildEvents()
    let eventName = 'updateTaskServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.updateTask(userId, unionId, checkState, event, eventName)
  }

  getTaskList(userId) {
  	let service = new TaskService()
    let event = DaoHelper.buildEvents()
    let eventName = 'getTaskListServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.getTaskList(userId, event, eventName)
  }
}