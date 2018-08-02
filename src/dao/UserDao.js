import DaoHelper from '../helper/DaoHelper.js'

export default class UserDao {

  /*
  添加user id
  userIdArray:user_id array
  admin权限
  */
  addUserId(userIdArray) {
    const c = DaoHelper.buildConnect()
    let addSql = 'INSERT INTO user_table(user_id) VALUES'
    let addSqlParams = []
    for (let id of userIdArray) {
      addSql += '(?),'
      addSqlParams.push(id)
    }
    addSql = addSql.substring(0, addSql.length - 1)
    c.query(addSql, addSqlParams, (err, result) => {
      if (DaoHelper.handleError(err)) return
      console.log(`result is ${result}`)
    })
    c.end()
  }

  /*
  根据userId参数删除对应userId
  userIdArray:user_id array
  admin权限
  */
  deleteUserId(userIdArray) {
    const c = DaoHelper.buildConnect()
    let deleteSql = `DELETE FROM user_table WHERE`
    let deleteSqlParams = []
    for (let id of userIdArray) {
      deleteSql += ' user_id=? OR'
      deleteSqlParams.push(id)
    }
    deleteSql = deleteSql.substring(0, deleteSql.length - 3)
    c.query(deleteSql, deleteSqlParams, (err, result) => {
      if (DaoHelper.handleError(err)) return
      console.log(`result is ${result}`)
    })
    c.end()
  }

  /*
  更新user id数值
  curUserIdArray:目标userId array
  newUserIdArray:需更新数值
  admin权限
  */
  updateUserId(curUserIdArray, newUserIdArray) {
    const c = DaoHelper.buildConnect()
    let updateSql = 'UPDATE user_table SET user_id = CASE user_id '
    let endSql = ''
    for (let i = 0; i < curUserIdArray.length; i++) {
      updateSql += `WHEN '${curUserIdArray[i]}' THEN '${newUserIdArray[i]}' `
      endSql +=`'${curUserIdArray[i]}',`
    }
    endSql = endSql.substring(0, endSql.length - 1)
    updateSql += `END WHERE user_id IN (${endSql})`
    console.log(`update sql is ${updateSql}`)

    c.query(updateSql, (err, result) => {
      if (DaoHelper.handleError(err)) return
      console.log(`result is ${result}`)
    })
    c.end()
  }

  /*
  验证传入的userId是否有效（是否在user table）
  */
  verifyUserId(userId) {
    const c = DaoHelper.buildConnect()
    let querySql = `SELECT user_id FROM user_table WHERE user_id='${userId}'`
    console.log(`querySql is ${querySql}`)
    c.query(querySql, (err, result) => {
      if (DaoHelper.handleError(err)) return
      console.log(Object.keys(result))
      // console.log(result[0]['user_id'])
    })
    c.end()
  }
}