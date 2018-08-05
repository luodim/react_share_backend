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
    event.on(eventName, (result) => {
      console.log(`service result is ${result}`)
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
    event.on(eventName, (result) => {
      console.log(`service result is ${result}`)
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
    event.on(eventName, (result) => {
      console.log(`service result is ${result}`)
    })
    task.updateTask(userId, unionId, checkState, event, eventName)
  }

  // /*
  // 根据unionId获取目标数据
  // unionId:目标数据的唯一识别id
  // */
  // getTarget(unionId) {
  //
  // }

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
    event.on(eventName, (result) => {
      if (result && Object.keys(result).length > 0) {
        valueArray = DaoHelper.setStatusMessage(valueArray, true)
        Object.keys(result).map(v => {
          dataList.push(result[v])
        })
      } else {
        valueArray = DaoHelper.setStatusMessage(valueArray, false)
      }
      valueArray = DaoHelper.setDataTime(valueArray, dataList)
      DaoHelper.buildJson(fields, valueArray)
    })
    task.getTaskList(userId, event, eventName)
  }
}