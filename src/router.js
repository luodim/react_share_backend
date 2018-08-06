import TargetService from './service/TargetService.js'
import TaskService from './service/TaskService.js'
import UserService from './service/UserService.js'

export default class Router {

  handlePathname(pathname, param) {
    switch (pathname) {
      case '/api/login': // 登陆验证
        let user = new UserService()
        user.verifyUserId(param.userId)
        break
      case '/api/home': // 首页数据请求
        
        break
      case '/api/task': // 任务列表请求
        break
      case '/api/task-update': // 任务列表更新
        break
      case '/api/add-user': // 生成新用户id
        break
      case '/api/upload-data': // 上传目标信息
        break
      case '/api/invation_code-set': // 首次登陆成功生成邀请码
        break
      case '/api/invation_code-get': // 获取当前user id对应的邀请码
        break
    }
  }
}