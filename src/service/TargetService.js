import TargetDao from '../dao/TargetDao.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class TargetService {

  /*
  上传目标数据
  */
  uploadTargetData(name, code, imgS, imgB, comment, contributor) {
    let uuid = DaoHelper.getUUID()
    let target = new TargetDao()
    target.uploadTargetData(name, code, uuid, imgS, imgB, comment, contributor)
  }

  /*
  根据unionId删除目标数据
  unionId:目标唯一识别id
  admin权限，支持批量操作
  */
  deleteTargetData(unionIdArray) {
    let target = new TargetDao()
    target.deleteTargetData(unionIdArray)
  }

  /*
  根据目标unionId更新目标数据
  unionId:目标唯一识别id
  ...field需更新字段
  */
  updateTargetData(unionId, fieldArray, newValueArray) {
    let target = new TargetDao()
    target.updateTargetData(unionId, fieldArray, newValueArray)
  }

  /*
  根据unionId获取目标数据
  */
  getTargetData(unionId) {
    let target = new TargetDao()
    target.getTargetData(unionId)
  }

  /*
  分页请求target列表数据
  pageIndex:分页查询页数索引
  number:每页请求数目
  userId:用于查询target列表中的数据是否存在与此userId的任务列表中
  */
  getTargetList(pageIndex, number, userId) {
    let target = new TargetDao()
    target.getTargetList()
  }
}