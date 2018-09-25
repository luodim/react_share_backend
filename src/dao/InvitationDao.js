import DaoHelper from '../helper/DaoHelper.js'

export default class InvitationDao {
  /*
  添加邀请码
  invitationCode:新的邀请码
  userId:生成新邀请码的用户id
  */
  addInvitationCode(invitationCode, userId) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO invitation_table(invitation_code, user_id) VALUES(?, ?)'
    let addSqlParams = [invitationCode, userId]
    return DaoHelper.handleDaoQuery(c, addSql, addSqlParams)
  }

  /*
  通过用户id获取邀请码
  userId:用户id
  */
  getInvitationCodesByUserId(userId) {
    const c = DaoHelper.buildConnect()
    let querySql = 'SELECT * FROM invitation_table WHERE user_id=?'
    let querySqlParams = [userId]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  /*
  获取可用邀请码（即未被使用过的邀请码）
  userId:用户id
  */
  getAvailableInvitationCodeByUserId(userId) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT * FROM invitation_table WHERE user_id=? AND is_used=?`
    let querySqlParams = [userId, 0]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  /*
  通过邀请码获取邀请码全部信息
  */
  getInvitationInfoByCode(invitationCode) {
    const c = DaoHelper.buildConnect()
    let querySql = 'SELECT * FROM invitation_table WHERE invitation_code=?'
    let querySqlParams = [invitationCode]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  /*
  更新邀请码使用状态
  invitationCode:被更新的邀请码
  state:更新状态[0:未使用, 1:已使用]
  */
  updateInvitationCodeUseState(invitationCode, state) {
    const c = DaoHelper.buildConnect()
    let updateSql = 'UPDATE invitation_table SET is_used=? WHERE invitation_code=?'
    let updateSqlParams = [state, invitationCode]
    return DaoHelper.handleDaoQuery(c, updateSql, updateSqlParams)
  }
}