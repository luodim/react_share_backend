import DaoHelper from '../helper/DaoHelper.js'

export default class UserDao {

  /*
  添加user id
  userId:用户id
  invitationCode:此账户生成的邀请码
  invitationCodeRelated:此账户注册时使用的邀请码
  fingerCode:设备指纹码
  */
  addUserId(userId, invitationCode, invitationCodeRelated, fingerCode, event, eventName) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO user_table(user_id, invitation_code, invitation_code_related, finger_code) VALUES(?, ?, ?, ?)'
    let addSqlParams = [userId, invitationCode, invitationCodeRelated, fingerCode]
    c.query(addSql, addSqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }

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
    c.query(deleteSql, deleteSqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
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

    c.query(updateSql, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }

  // 更新邀请码
  updateinvitationCode(invitationCode, userId) {
    const c = DaoHelper.buildConnect()
    let updateSql = 'UPDATE user_table SET invitation_code=? WHERE user_id=?'
    let updateSqlParams = [invitationCode, userId]
    c.query(querySql, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
    })
    c.end()
  }

  // 查询邀请码，分两种模式
  // mode === invitation:查询生成此邀请码的用户
  // mode === invitation_related:查询使用此邀请码注册的用户
  verifyInvitationCode(invitationCode, mode, event, eventName) {
    const c = DaoHelper.buildConnect()
    let querySql = mode === 'invitation' ? `SELECT * FROM user_table WHERE invitation_code=?` : `SELECT * FROM user_table WHERE invitation_code_related=?`
    let querySqlParams = [invitationCode]
    c.query(querySql, querySqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }

  // 查询设备指纹码
  verifyFingerCode(fingerCode, event, eventName) {
    const c = DaoHelper.buildConnect()
    let querySql = 'SELECT * FROM user_table WHERE finger_code=?'
    let querySqlParams = [fingerCode]
    c.query(querySql, querySqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }

  /*
  验证传入的userId是否有效（是否在user table）
  */
  verifyUserId(userId, event, eventName) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT user_id FROM user_table WHERE user_id='${userId}'`
    c.query(querySql, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }
}