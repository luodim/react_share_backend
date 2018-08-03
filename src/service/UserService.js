import UserDao from '../dao/UserDao.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class UserService {

  /*
  添加user id
  admin权限,可批量化操作
  */
  addUserId(userIdArray) {
    let user = new UserDao()
    let event = DaoHelper.buildEvents()
    let eventName = 'addUserDaoCB'
    event.on(eventName, (result) => {
      console.log(`service result is ${result}`)
    })
    user.addUserId(userIdArray, event, eventName)
  }

  /*
  根据userId参数删除对应userId
  admin权限，可批量化操作
  */
  deleteUserId(userIdArray) {
    let user = new UserDao()
    user.deleteUserId(userIdArray)
  }

  /*
  更新user id数值
  admin权限，可批量化操作
  */
  updateUserId(curUserIdArray, newUserIdArray) {
    let user = new UserDao()
    user.updateUserId(curUserIdArray, newUserIdArray)
  }

  /*
  验证传入的userId是否有效（是否在user table）
  */
  verifyUserId(userId) {
    let user = new UserDao()
    user.verifyUserId(userId)
  }
}