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
  上传目标信息服务
  name:目标名字
  code:目标编码
  imgResBig:目标大图链接
  imgResSmall:目标小图链接
  comment:对目标的评论
  contributor:目标信息贡献者
  location:目标所在位置
  */
  async uploadTargetData(name, code, imgResBig, imgResSmall, comment, contributor, location, event, eventName) {
    let dao = new TargetDao()
    let fieldArray = ['userId', 'message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    let unionId = DaoHelper.getUUID()
    let result = await dao.uploadTargetData(name, code, unionId, imgResBig, imgResSmall, comment, contributor, location)
    if (result && result['affectedRows']) { // 上传成功
      datalist.push({name:name, code:code, union_id:unionId, img_res_big:imgResBig, img_res_small:imgResSmall, comment:comment, contributor:contributor, location:location})
      DaoHelper.setStatusMessage(valueArray, true)
    } else { // 上传失败
      DaoHelper.setStatusMessage(valueArray, false, '信息上传失败，请重试')
    }
    DaoHelper.handleBuild(datalist, fieldArray, valueArray, event, eventName)
  }

  //---------------------------------------------------------------------------

  /*
  根据unionId删除目标数据
  unionId:目标唯一识别id
  admin权限，支持批量操作
  */
  async deleteTargetData(unionIdArray, event, eventName) {
    let dao = new TargetDao()
    let fieldArray = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    let result = await dao.deleteTargetData(unionIdArray)
    if (result && result['affectedRows']) {
      DaoHelper.setStatusMessage(valueArray, true)
    } else {
      DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fieldArray, valueArray, event, eventName)
  }

  /*
  根据目标unionId更新目标数据
  unionId:目标唯一识别id
  admin权限，暂不开放user操作
  */
  async updateTargetData(unionId, fieldArray, newValueArray, event, eventName) {
    let dao = new TargetDao()
    let fields = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    let result = await dao.updateTargetData(unionId, fieldArray, newValueArray)
    if (result && result['affectedRows']) {
      DaoHelper.setStatusMessage(valueArray, true)
    } else {
      DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fields, valueArray, event, eventName)
  }

  /*
  根据unionId获取目标数据
  */
  async getTargetData(unionId, event, eventName) {
    let dao = new TargetDao()
    let fieldArray = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    let result = await dao.getTargetData(unionId)
    if (result && result.length > 0) {
      datalist = datalist.concat(result)
      DaoHelper.setStatusMessage(valueArray, true)
    } else {
      DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fieldArray, valueArray, event, eventName)
  }

  /*
  根据页面索引及每页请求数量分页请求
  sinceId:上一次查询获取结果的末位游标
  number:单页请求数量
  userId:用户id
  event:回调事件
  eventName:回调事件名称
  */
  async getTargetList(sinceId, userId, event, eventName, number = 10) {
    let dao = new TargetDao()
    let fieldArray = ['message', 'status', 'data', 'timestamp']
    let valueArray = []
    let datalist = []
    number = parseInt(number)
    number = number > 100 ? 100 : number
    let result = await dao.getTargetList(sinceId, number, userId)
    if (result) {
      datalist = datalist.concat(result)
      DaoHelper.setStatusMessage(valueArray, true)
    } else {
      DaoHelper.setStatusMessage(valueArray, false)
    }
    DaoHelper.handleBuild(datalist, fieldArray, valueArray, event, eventName)
  }

}