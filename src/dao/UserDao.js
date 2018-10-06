import DaoHelper from '../helper/DaoHelper.js'

export default class UserDao {

  /*
  根据userId参数删除对应userId
  userIdArray:user_id array
  admin权限
  */
  deleteUserId(userIdArray, event, eventName) {
    const c = DaoHelper.buildConnect()
    let deleteSql = `DELETE FROM user_table WHERE`
    let deleteSqlParams = []
    for (let id of userIdArray) {
      deleteSql += ' user_id=? OR'
      deleteSqlParams.push(id)
    }
    deleteSql = deleteSql.substring(0, deleteSql.length - 3)
    return DaoHelper.handleDaoQuery(c, deleteSql, deleteSqlParams)
  }

  /*
  更新user id数值
  curUserIdArray:目标userId array
  newUserIdArray:需更新数值
  admin权限
  */
  updateUserId(curUserIdArray, newUserIdArray, event, eventName) {
    const c = DaoHelper.buildConnect()
    let updateSql = 'UPDATE user_table SET user_id = CASE user_id '
    let endSql = ''
    for (let i = 0; i < curUserIdArray.length; i++) {
      updateSql += `WHEN '${curUserIdArray[i]}' THEN '${newUserIdArray[i]}' `
      endSql +=`'${curUserIdArray[i]}',`
    }
    endSql = endSql.substring(0, endSql.length - 1)
    updateSql += `END WHERE user_id IN (${endSql})`
    return DaoHelper.handleDaoQuery(c, updateSql)
  }

  // 通过userId获取用户信息
  getUserInfoByUserId(userId) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT user_table2.*,invitation_table.invitation_code FROM user_table2
    LEFT JOIN invitation_table ON user_table2.user_id=invitation_table.user_id
    WHERE user_table2.user_id=? and invitation_table.is_used=?`
    let querySqlParams = [userId, 0]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  // 通过邀请码获取用户信息
  getUserInfoByInvitationCode(invitationCode) {
    const c = DaoHelper.buildConnect()
    let querySql = 'SELECT * FROM user_table2 WHERE invitation_code_related=?'
    let querySqlParams = [invitationCode]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  // 创建新用户
  addUser(userId, invitationCode, fingerCode, nickname) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO user_table2(user_id, invitation_code_related, finger_code, nickname) VALUES(?, ?, ?, ?)'
    let addSqlParams = [userId, invitationCode, fingerCode, nickname]
    return DaoHelper.handleDaoQuery(c, addSql, addSqlParams)
  }

  getUserList() {
    const c = DaoHelper.buildConnect()
    let querySql = 'SELECT * FROM user_table2'
    return DaoHelper.handleDaoQuery(c, querySql)
  }
}