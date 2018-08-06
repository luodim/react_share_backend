import DaoHelper from '../helper/DaoHelper.js'

export default class TargetDao {

  /*
  上传目标数据
  */
  uploadTargetData(name, code, unionId, imgS, imgB, comment, contributor, event, eventName) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO target_table(name, code, union_id, img_res_small, img_res_big, comment, contributor)'
    +` VALUES(?, ?, ?, ?, ?, ?, ?)`
    let addSqlParams = [name, code, unionId, imgS, imgB, comment, contributor]
    c.query(addSql, addSqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      DaoHelper.handleEvent(result, event, eventName)
    })
    c.end()
  }

  /*
  根据unionId删除目标数据
  unionId:目标唯一识别id
  */
  deleteTargetData(unionIdArray, event, eventName) {
    const c = DaoHelper.buildConnect()
    let deleteSql = `DELETE FROM target_table WHERE`
    let deleteSqlParams = []
    for (let id of unionIdArray) {
      deleteSql += ' union_id=? OR'
      deleteSqlParams.push(id)
    }
    deleteSql = deleteSql.substring(0, deleteSql.length - 3)
    c.query(deleteSql, deleteSqlParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      DaoHelper.handleEvent(result, event, eventName)
    })
    c.end()
  }

  /*
  根据目标unionId更新目标数据
  unionId:目标唯一识别id
  ...field需更新字段
  */
  updateTargetData(unionId, fieldArray, newValueArray, event, eventName) {
    const c = DaoHelper.buildConnect()
    let updateSql = 'UPDATE target_table SET'
    let endSql = ` WHERE union_id='${unionId}'`
    for (let i = 0; i < fieldArray.length; i++) {
      updateSql += ` ${fieldArray[i]}='${newValueArray[i]}',`
    }
    updateSql = updateSql.substring(0, updateSql.length - 1)
    updateSql += endSql
    c.query(updateSql, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      DaoHelper.handleEvent(result, event, eventName)
    })
    c.end()
  }

  /*
  根据unionId获取目标数据
  */
  getTargetData(unionId, event, eventName) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT * FROM target_table WHERE union_id=?`
    let queryParams = [unionId]
    c.query(querySql, queryParams, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      DaoHelper.handleEvent(result, event, eventName)
    })
    c.end()
  }

  /*
  分页请求target列表数据
  pageIndex:分页查询页数索引
  number:每页请求数目
  */
  getTargetList(pageIndex, number, event, eventName) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT * FROM target_table`
    c.query(querySql, (err, result) => {
      if (DaoHelper.handleError(err, event, eventName)) return
      DaoHelper.handleEvent(result, event, eventName)
    })
    c.end()
  }

}