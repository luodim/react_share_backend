import DaoHelper from '../helper/DaoHelper.js'

export default class TaskDao {

  /*
  添加任务到任务列表
  userId:用户id
  unionId:添加目标的唯一识别id
  暂不支持批量更新
  */
  addTask(userId, unionId, event, eventName) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO task_table(user_id, is_checked, union_id) VALUES(?, ?, ?)'
    let addSqlParams = [userId, 0, unionId]
    c.query(addSql, addSqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }

  /*
  删除任务
  userId:用户id
  unionId:删除目标的唯一识别id
  */
  deleteTask(userId, unionId, event, eventName) {
    const c = DaoHelper.buildConnect()
    let deleteSql = 'DELETE FROM task_table WHERE union_id=? AND user_id=?'
    let deleteSqlParams = [unionId, userId]
    c.query(deleteSql, deleteSqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }

  /*
  更新任务状态
  userId:用户id
  unionId:更新目标的唯一识别id
  checkState:更新行为（是否被选中）
  */
  updateTask(userId, unionId, checkState, event, eventName) {
    const c = DaoHelper.buildConnect()
    let updateSql = 'UPDATE task_table SET is_checked=? WHERE union_id=? AND user_id=?'
    let updateSqlParams = [checkState, unionId, userId]
    c.query(updateSql, updateSqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }

  // 根据unionId获取目标数据
  // unionId:目标数据的唯一识别id
  // getTarget(unionId) {

  // }

  /*
  根据userId获取对应任务列表
  userId:用户id
  */
  getTaskList(userId, event, eventName) {
    const c = DaoHelper.buildConnect()
    let querySql = 'SELECT * FROM task_table WHERE user_id=?'
    let querySqlParams = [userId]
    c.query(querySql, querySqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      event.emit(eventName, result)
    })
    c.end()
  }
}