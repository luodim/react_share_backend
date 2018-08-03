import TargetDao from '../dao/TargetDao.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class TargetService {

  /*
  上传目标数据
  */
  uploadTargetData(name, code, imgS, imgB, comment, contributor) {
    let uuid = DaoHelper.getUUID()
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'uploadTargetDaoCB'
    let fieldArray
    let valueArray = []
    event.on(eventName, (result) => {
      fieldArray = ['userId', 'message', 'status', 'data', 'timestamp']
      valueArray.push(contributor)
      if (result && result['affectedRows']) {
        valueArray.push('success')
        valueArray.push('200')
      } else {
        valueArray.push('fail')
        valueArray.push('400')
      }
      valueArray.push({})
      valueArray.push(new Date().getTime())
      DaoHelper.buildJson(fieldArray, valueArray)
    })
    target.uploadTargetData(name, code, uuid, imgS, imgB, comment, contributor, event, eventName)
  }

  /*
  根据unionId删除目标数据
  unionId:目标唯一识别id
  admin权限，支持批量操作
  */
  deleteTargetData(unionIdArray) {
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'deleteTargetDaoCB'
    let fieldArray
    let valueArray = []
    event.on(eventName, (result) => {
      fieldArray = ['message', 'status', 'data', 'timestamp']
      if (result && result['affectedRows']) {
        valueArray.push('success')
        valueArray.push('200')
      } else {
        valueArray.push('fail')
        valueArray.push('400')
      }
      valueArray.push({})
      valueArray.push(new Date().getTime())
      DaoHelper.buildJson(fieldArray, valueArray)
    })
    target.deleteTargetData(unionIdArray, event, eventName)
  }

  /*
  根据目标unionId更新目标数据
  unionId:目标唯一识别id
  admin权限，暂不开放user操作
  */
  updateTargetData(unionId, fieldArray, newValueArray) {
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'updateTargetDaoCB'
    let fields
    let valueArray = []
    event.on(eventName, (result) => {
      fields = ['message', 'status', 'data', 'timestamp']
      if (result && result['affectedRows']) {
        valueArray.push('success')
        valueArray.push('200')
      } else {
        valueArray.push('fail')
        valueArray.push('400')
      }
      valueArray.push({})
      valueArray.push(new Date().getTime())
      DaoHelper.buildJson(fields, valueArray)
    })
    target.updateTargetData(unionId, fieldArray, newValueArray, event, eventName)
  }

  /*
  根据unionId获取目标数据
  */
  getTargetData(unionId) {
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'getTargetDaoCB'
    let fields
    let valueArray = []
    let data = {}
    event.on(eventName, (result) => {
      fields = ['message', 'status', 'data', 'timestamp']
      if (result && result['affectedRows']) {
        valueArray.push('success')
        valueArray.push('200')
      } else {
        valueArray.push('fail')
        valueArray.push('400')
      }
      valueArray.push(data)
      valueArray.push(new Date().getTime())
      let keyArray = Object.keys(result)
      if (keyArray.length > 0) {
        data = result
      }
      DaoHelper.buildJson(fields, valueArray)
    })
    target.getTargetData(unionId, event, eventName)
  }

  /*
  分页请求target列表数据
  pageIndex:分页查询页数索引
  number:每页请求数目
  userId:用于查询target列表中的数据是否存在与此userId的任务列表中
  */
  getTargetList(pageIndex, number, userId) {
    let target = new TargetDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'getTargetListCB'
    event.on(eventName, (result) => {
      console.log(`service result is ${result}`)
    })
    target.getTargetList(pageIndex, number, event, eventName)
  }
}