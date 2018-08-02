import DaoHelper from '../helper/DaoHelper.js'

export default class TaskDao {

  /*
  添加任务到任务列表
  userId:用户id
  unionId:添加目标的唯一识别id
  */
  addTask(userId, unionId) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO user_table(user_id) VALUES'
    let addSqlParams = []
  }

  /*
  删除任务
  userId:用户id
  unionId:删除目标的唯一识别id
  */
  deleteTask(userId, union) {

  }

  /*
  更新任务状态
  userId:用户id
  unionId:更新目标的唯一识别id
  checkState:更新行为（是否被选中）
  */
  updateTask(userId, union, checkState) {

  }

  /*
  根据unionId获取目标数据
  unionId:目标数据的唯一识别id
  */
  getTarget(unionId) {

  }

  /*
  根据userId获取对应任务列表
  userId:用户id
  */
  getTaskList(userId) {

  }
}