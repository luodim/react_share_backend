import TaskDao from '../dao/TaskDao.js'
import DaoHelper from '../helper/DaoHelper.js'
import TargetDao from '../dao/TargetDao.js'

export default class TaskService {

  /*
  添加任务到任务列表
  userId:用户id
  unionId:添加目标的唯一识别id
  */
  async addTask(userId, unionId, event, eventName) {
    let dao = new TaskDao()
    let fieldArray = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    let result = await dao.addTask(userId, unionId)
    if (result && result['affectedRows']) {
      datalist.push({user_id:userId, union_id:unionId, is_checked:false})
      DaoHelper.setStatusMessage(valueArray, true)
    } else {
      DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fieldArray, valueArray, event, eventName)
  }

  /*
  删除任务
  userId:用户id
  unionId:删除目标的唯一识别id
  */
  async deleteTask(userId, unionId, event, eventName) {
    let dao = new TaskDao()
    let fieldArray = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    let result = await dao.deleteTask(userId, unionId)
    if (result && result['affectedRows']) {
      DaoHelper.setStatusMessage(valueArray, true)
    } else {
      DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fieldArray, valueArray, event, eventName)
  }

  /*
  更新任务状态
  userId:用户id
  unionId:更新目标的唯一识别id
  checkState:更新行为（是否被选中）
  */
  async updateTask(userId, unionId, checkState, event, eventName) {
    let dao = new TaskDao()
    let fieldArray = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    checkState = checkState === 'true' ? 1 : 0
    console.log(`checkState is ${checkState}`)
    let result = await dao.updateTask(userId, unionId, checkState)
    if (result && result['affectedRows']) {
      DaoHelper.setStatusMessage(valueArray, true)
    } else {
      DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fieldArray, valueArray, event, eventName)
  }

  /*
  根据userId获取对应任务列表
  userId:用户id
  */
  async getTaskList(userId, event, eventName) {
    let dao = new TaskDao()
    let fieldArray = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []

    let result = await dao.getTaskList(userId)
    if (result) {
      datalist = datalist.concat(result)
      DaoHelper.setStatusMessage(valueArray, true)
    } else {
      DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fieldArray, valueArray, event, eventName)
  }

}