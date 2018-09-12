import TargetDao from '../dao/TargetDao.js'
import DaoHelper from '../helper/DaoHelper.js'
import TaskDao from '../dao/TaskDao.js'

export default class TargetService {

  /*
  上传目标数据
  */
  uploadTargetData(name, code, imgRes, comment, contributor, e, en) {
    let uuid = DaoHelper.getUUID()
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'uploadTargetDaoCB'
    let fieldArray
    let valueArray = []
    let dataList = []
    event.on(eventName, (result) => {
      fieldArray = ['userId', 'message', 'status', 'data', 'timestamp']
      valueArray.push(contributor)
      if (result && result['affectedRows']) {
        DaoHelper.setStatusMessage(valueArray, true)
      } else {
        DaoHelper.setStatusMessage(valueArray, false)
      }
      DaoHelper.setDataTime(valueArray, dataList)
      e.emit(en, DaoHelper.buildJson(fieldArray, valueArray))
    })
    target.uploadTargetData(name, code, uuid, imgRes, comment, contributor, event, eventName)
  }

  /*
  根据unionId删除目标数据
  unionId:目标唯一识别id
  admin权限，支持批量操作
  */
  deleteTargetData(unionIdArray, e, en) {
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'deleteTargetDaoCB'
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
      e.emit(en, DaoHelper.buildJson(fieldArray, valueArray))
    })
    target.deleteTargetData(unionIdArray, event, eventName)
  }

  /*
  根据目标unionId更新目标数据
  unionId:目标唯一识别id
  admin权限，暂不开放user操作
  */
  updateTargetData(unionId, fieldArray, newValueArray, e, en) {
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'updateTargetDaoCB'
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
      e.emit(en, DaoHelper.buildJson(fields, valueArray))
    })
    target.updateTargetData(unionId, fieldArray, newValueArray, event, eventName)
  }

  /*
  根据unionId获取目标数据
  */
  getTargetData(unionId, e, en) {
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'getTargetDaoCB'
    let fields
    let valueArray = []
    let dataList = []
    event.on(eventName, (result) => {
      console.log('target service get the cb')
      fields = ['message', 'status', 'data', 'timestamp']
      if (result && Object.keys(result).length > 0) {
        DaoHelper.setStatusMessage(valueArray, true)
        Object.keys(result).map(v => {dataList.push(result[v])})
      } else {
        DaoHelper.setStatusMessage(valueArray, false)
      }
      DaoHelper.setDataTime(valueArray, dataList)
      e.emit(em, DaoHelper.buildJson(fields, valueArray))
    })
    target.getTargetData(unionId, event, eventName)
  }

  /*
  分页请求target列表数据
  pageIndex:分页查询页数索引
  number:每页请求数目
  userId:用于查询target列表中的数据是否存在于此userId的任务列表中
  */
  getTargetList(pageIndex, number, userId, e, en) {
    let target = new TargetDao()
    let task = new TaskDao()
    let eventTarget = DaoHelper.buildEvents()
    let eventTask = DaoHelper.buildEvents()
    let eventTargetName = 'getTargetListDaoCB'
    let eventTaskName = 'getTaskListDaoCB'

    // todo---对tasklist中的union id与targetlist中的union id比对---------------
    // 先查询target list的数据，然后根据userId获取userId对应的task list数据，
    // 再将task list数据与target list数据比对来确定返回数据中的isInTask字段
    let fields
    let valueArray = []
    let dataList = []
    eventTarget.on(eventTargetName, (result) => {
      fields = ['message', 'status', 'data', 'timestamp']
      if (result && Object.keys(result).length > 0) {
        // 查询task list
        task.getTaskList(userId, eventTask, eventTaskName)
        let taskUnionIdList = []
        valueArray = DaoHelper.setStatusMessage(valueArray, true)
        // 任务列表查询数据回调
        eventTask.on(eventTaskName, (r) => {
          // 生成task中union id列表
          if (r && r.length > 0) {
            Object.keys(r).map(kv => {
              taskUnionIdList.push(r[kv]['union_id'])
            })
          }
          // 添加target数据到datalist中
          Object.keys(result).map(v => {
            result[v]['is_in_task'] = taskUnionIdList.indexOf(result[v]['union_id']) === -1 ? false : true
            dataList.push(result[v])
          })
          this.handleBuild(dataList, fields, valueArray, e, en)
        })
      } else {
        valueArray = DaoHelper.setStatusMessage(valueArray, true)
        this.handleBuild(dataList, fields, valueArray, e, en)
      }
    })
    target.getTargetList(pageIndex, number, eventTarget, eventTargetName)
  }

  handleBuild(datalist, fields, valueArray, event, eventName) {
    valueArray = DaoHelper.setDataTime(valueArray, datalist)
    let json = DaoHelper.buildJson(fields, valueArray)
    event.emit(eventName, DaoHelper.buildJson(fields, valueArray))
  }
}