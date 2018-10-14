import DaoHelper from '../helper/DaoHelper.js'

export default class TargetDao {

  /*
  上传目标数据
  name:目标名称
  code:目标编号
  unionId:目标唯一识别码
  imgResBig:目标大图
  imgResSmall：目标小图
  comment：对目标的评论
  contributor:目标资料贡献者
  location:目标所在地点
  */
  uploadTargetData(name, code, unionId, imgResBig, imgResSmall, comment, contributor, location) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO target_table(name, code, union_id, img_res, img_res_small, comment, contributor, location)'
    +` VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
    let addSqlParams = [name, code, unionId, imgResBig, imgResSmall, comment, contributor, location]
    return DaoHelper.handleDaoQuery(c, addSql, addSqlParams)
  }

  /*
  根据unionId删除目标数据
  unionId:目标唯一识别id
  */
  deleteTargetData(unionIdArray) {
    const c = DaoHelper.buildConnect()
    let delSql = `DELETE FROM target_table WHERE`
    let delSqlParams = []
    for (let id of unionIdArray) {
      delSql += ' union_id=? OR'
      delSqlParams.push(id)
    }
    delSql = delSql.substring(0, delSql.length - 3)
    return DaoHelper.handleDaoQuery(c, delSql, delSqlParams)
  }

  /*
  根据目标unionId更新目标数据
  unionId:目标唯一识别id
  ...field需更新字段
  */
  updateTargetData(unionId, fieldArray, newValueArray) {
    const c = DaoHelper.buildConnect()
    let updateSql = 'UPDATE target_table SET'
    let endSql = ` WHERE union_id='${unionId}'`
    for (let i = 0; i < fieldArray.length; i++) {
      updateSql += ` ${fieldArray[i]}='${newValueArray[i]}',`
    }
    updateSql = updateSql.substring(0, updateSql.length - 1)
    updateSql += endSql
    return DaoHelper.handleDaoQuery(c, updateSql)
  }

  /*
  根据unionId获取目标数据
  */
  getTargetData(unionId) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT * FROM target_table WHERE union_id=?`
    let querySqlParams = [unionId]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  /*
  根据页面索引及每页请求数量分页请求
  sinceId:上一次查询获取结果的末位游标
  number:单页请求数量
  userId:用户id
  */
  getTargetList(sinceId, number, userId) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT target_table.*,task_table.id FROM target_table LEFT JOIN task_table ON target_table.union_id=task_table.union_id`
    + ` AND task_table.user_id=? WHERE target_table.cursor_id<? ORDER BY target_table.cursor_id DESC LIMIT ?`
    let querySqlParams = [userId, sinceId, number]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  /*获取最大游标id*/
  getMaxCursorId() {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT MAX(cursor_id) from target_table`
    return DaoHelper.handleDaoQuery(c, querySql)
  }

  /*获取最小游标id*/
  getMinCursorId() {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT MIN(cursor_id) from target_table`
    return DaoHelper.handleDaoQuery(c, querySql)
  }

  /*获取贡献过的信息列表*/
  getContributionList(userId) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT * FROM target_table WHERE contributor=? ORDER BY cursor_id DESC`
    let querySqlParams = [userId]
    return DaoHelper.handleDaoQuery(c, querySql, querySqlParams)
  }

  /*更新目标信息*/
  updateTargetInfo(name, code, unionId, imgResBig, imgResSmall, comment, location) {
    const c = DaoHelper.buildConnect()
    let params = [name, code, imgResBig, imgResSmall, comment, location]
    let sqlPart = ['name=?,', 'code=?,', 'img_res=?,', 'img_res_small=?,', 'comment=?,', 'location=?,']
    let updateSql = `UPDATE target_table SET `
    let updateSqlParams = []
    params.map((v, index) => {
      if (v || v === '') {
        updateSql += sqlPart[index]
        v === '' ? updateSqlParams.push(null) : updateSqlParams.push(v)
      }
    })
    let index = updateSql.lastIndexOf(',')
    if (index !== -1) {
      updateSql = updateSql.substring(0, index)
    }
    updateSql += ` WHERE union_id=?`
    updateSqlParams.push(unionId)
    console.log(`sql is ${updateSql}`)
    console.log(updateSqlParams)
    return DaoHelper.handleDaoQuery(c, updateSql, updateSqlParams)
  }

}