import UserService from './service/UserService.js'
import TargetService from './service/TargetService.js'
import TaskService from './service/TaskService.js'
import Server from './server.js'


let server = new Server()
server.startServer()

// testAddUser()
// testDeleteUser()
// updateUser()
// queryUser()
// uploadTarget()
// deleteTarget()
// updateTarget()
// queryTarget()
// getTargetList()
// addTaskTest()
// delTaskTest()
// updateTaskTest()
// getTaskListTest()

// var http = require('http');

// http.createServer(function (request, response) {

//     // 发送 HTTP 头部
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

function getTaskListTest() {
  let task = new TaskService()
  task.getTaskList('u1')
}

function updateTaskTest() {
  let task = new TaskService()
  task.updateTask('zuzuzuzuzuzuzuzuz', 'cccccccffffffffff', 1)
}

function delTaskTest() {
  let task = new TaskService()
  task.deleteTask('zuzuzuzuzuzuzuzuz', 'cccccccffffffffff')
}

function addTaskTest() {
  let task = new TaskService()
  task.addTask('zuzuzuzuzuzuzuzuz', 'cccccccffffffffff')
}

function getTargetList() {
  let target = new TargetService()
  target.getTargetList(1, 10, 'u4')
}

function queryTarget() {
  let target = new TargetService()
  target.getTargetData('7333d760-420b-4592-81f8-ef07841d7ef9')
}

function uploadTarget() {
  let target = new TargetService()
  let name = 'testetstetstetstetstete'
  let code = '222333444'
  let imgS = 'https://www.wind.com/small'
  let imgB = 'https://www.wind.com/big'
  let comment = 'in the morning we can do something hahahahahaha'
  let contributor = 'zzzzz123'
  target.uploadTargetData(name, code, imgS, imgB, comment, contributor)
}

function deleteTarget() {
  let target = new TargetService()
  target.deleteTargetData(['bc987b6c-92f5-4cd4-a3d9-fc6f8ed6ad96'])
}

function updateTarget() {
  let target = new TargetService()
  target.updateTargetData('7333d760-420b-4592-81f8-ef07841d7ef9', ['img_res_small', 'img_res_big', 'comment'], ['111', '222', '333'])
}

function testAddUser() {
  const user = new UserService()
  let array = []
  for (let i = 0; i < 10; i++) {
    array.push(`user-third${i}`)
  }
  user.addUserId(array)
}

function testDeleteUser() {
  const user = new UserService()
  user.deleteUserId(['user-third0', 'user-third1', 'user-third2', 'user-third3',
  	'user-third4', 'user-third5', 'user-third6', 'user-third7', 'user-third8', 'user-third9'])
}

function testAddSecond() {
  const user = new UserService()
  for (let i = 0; i < 10; i++) {
    user.addUserId(`user${i}second`)
  }
}

function updateUser() {
  const user = new UserService()
  user.updateUserId(['user8'], ['6xxxxx'])
}

function queryUser() {
  const user = new UserService()
  user.verifyUserId('ddddddddddd')
}