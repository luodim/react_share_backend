import TaskDao from '../dao/TaskDao.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class TaskService {

  /*
  添加任务到任务列表
  userId:用户id
  unionId:添加目标的唯一识别id
  */
  addTask(userId, unionId) {
    let task = new TaskDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'addTaskDaoCB'
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
      DaoHelper.buildJson(fieldArray, valueArray)
    })
    task.addTask(userId, unionId, event, eventName)
  }

  /*
  删除任务
  userId:用户id
  unionId:删除目标的唯一识别id
  */
  deleteTask(userId, unionId) {
    let task = new TaskDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'deleteTaskDaoCB'
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
      DaoHelper.buildJson(fieldArray, valueArray)
    })
    task.deleteTask(userId, unionId, event, eventName)
  }

  /*
  更新任务状态
  userId:用户id
  unionId:更新目标的唯一识别id
  checkState:更新行为（是否被选中）
  */
  updateTask(userId, unionId, checkState) {
    let task = new TaskDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'updateTaskDaoCB'
    let fields
    let valueArray = []
    let dataList = []
    event.on(eventName, (result) => {
      fields = ['message', 'status', 'data', 'timestamp']
      if (result && result['affectedRows']) {
        DaoHelper.setStatusMessage(valueArray, true)
      } else {
        DaoHelper.setStatusMessage(valueArray, false)
      }
      DaoHelper.setDataTime(valueArray, dataList)
      DaoHelper.buildJson(fields, valueArray)
    })
    task.updateTask(userId, unionId, checkState, event, eventName)
  }

  /*
  根据userId获取对应任务列表
  userId:用户id
  */
  getTaskList(userId) {
    let task = new TaskDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'getTaskListDaoCB'
    let valueArray = []
    let dataList = []
    let fields
    event.on(eventName, (result) => {
      fields = ['message', 'status', 'data', 'timestamp']
      if (result && Object.keys(result).length > 0) {
        valueArray = DaoHelper.setStatusMessage(valueArray, true)
        Object.keys(result).map(v => {
          dataList.push(result[v])
        })
      } else {
        valueArray = DaoHelper.setStatusMessage(valueArray, false)
      }
      DaoHelper.setDataTime(valueArray, dataList)
      DaoHelper.buildJson(fields, valueArray)
    })
    task.getTaskList(userId, event, eventName)
  }
}