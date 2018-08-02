import UserDao from '../dao/UserDao.js'

export default class UserService {

  /*
  添加user id
  admin权限
  */
  addUserId(userIdArray) {
    let user = new UserDao()
    user.addUserId(userIdArray)
  }

  /*
  根据userId参数删除对应userId
  admin权限
  */
  deleteUserId(userIdArray) {
    let user = new UserDao()
    user.deleteUserId(userIdArray)
  }

  /*
  更新user id数值
  admin权限
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