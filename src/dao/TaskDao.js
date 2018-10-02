import DaoHelper from '../helper/DaoHelper.js'

export default class TaskDao {

  /*
  添加任务到任务列表
  userId:用户id
  unionId:添加目标的唯一识别id
  暂不支持批量更新
  */
  addTask(userId, unionId) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO task_table(user_id, is_checked, union_id) VALUES(?, ?, ?)'
    let addSqlParams = [userId, 0, unionId]
    return DaoHelper.handleDaoQuery(c, addSql, addSqlParams)
  }

  /*
  删除任务
  userId:用户id
  unionId:删除目标的唯一识别id
  */
  deleteTask(userId, unionId) {
    const c = DaoHelper.buildConnect()
    let delSql = 'DELETE FROM task_table WHERE union_id=? AND user_id=?'
    let delSqlParams = [unionId, userId]
    return DaoHelper.handleDaoQuery(c, delSql, delSqlParams)
  }

  /*
  更新任务状态
  userId:用户id
  unionId:更新目标的唯一识别id
  checkState:更新行为（是否被选中）
  */
  updateTask(userId, unionId, checkState) {
    const c = DaoHelper.buildConnect()
    let updateSql = 'UPDATE task_table SET is_checked=? WHERE union_id=? AND user_id=?'
    let updateSqlParams = [checkState, unionId, userId]
    return DaoHelper.handleDaoQuery(c, updateSql, updateSqlParams)
  }

  /*
  获取指定unionId在任务列表中的数量
  union_id:目标唯一识别码
  */
  getTaskNum(unionId) {
    const c = DaoHelper.buildConnect()
    let querySql = 'SELECT COUNT(union_id) from task_table WHERE union_id=?'
    let querySqlParams = [unionId]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  /*
  根据userId获取对应任务列表
  userId:用户id
  */
  getTaskList(userId) {
    const c = DaoHelper.buildConnect()
    let querySql = 'SELECT * FROM task_table LEFT JOIN target_table ON task_table.union_id=target_table.union_id WHERE task_table.user_id=?'
    let querySqlParams = [userId]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }
}