import UserService from './service/UserService.js'
import TargetService from './service/TargetService.js'
import TaskService from './service/TaskService.js'

// testAddUser()
// testDeleteUser()
// updateUser()
// queryUser()
// uploadTarget()
// deleteTarget()
// updateTarget()
queryTarget()
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
  task.updateTask('u3333xxx3333fff', '0x2168-sdsfjf-dfksdfjkdsjf', 1)
}

function delTaskTest() {
  let task = new TaskService()
  task.deleteTask('u3333xxx3333fffdddd', '0x2168-sdsfjf-dfksdfjkdsjfccccc')
}

function addTaskTest() {
  let task = new TaskService()
  task.addTask('u3333xxx3333fffdddd', '0x2168-sdsfjf-dfksdfjkdsjfccccc')
}

function getTargetList() {
  let target = new TargetService()
  target.getTargetList()
}

function queryTarget() {
  let target = new TargetService()
  target.getTargetData('44172ab0-6021-46a8-8686-3460adba9e3c')
}

function uploadTarget() {
  let target = new TargetService()
  let name = 'A Bee'
  let code = '777'
  let imgS = 'https://www.bing.com/small'
  let imgB = 'https://www.bing.com/big'
  let comment = 'this is girl is quite beautiful and skill is also good'
  let contributor = 'u43fffxxx'
  target.uploadTargetData(name, code, imgS, imgB, comment, contributor)
}

function deleteTarget() {
  let target = new TargetService()
  target.deleteTargetData(['a7723fd5-8987-44c6-841e-bdd0a905a0cf'])
}

function updateTarget() {
  let target = new TargetService()
  target.updateTargetData('0f7c44b0-c03d-4415-91fa-1772d9d20512', ['img_res_small', 'img_res_big', 'comment'], ['aaa', 'bbb', 'ccc'])
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
  user.updateUserId(['user6'], ['user6ccc'])
}

function queryUser() {
  const user = new UserService()
  user.verifyUserId('new-u3')
}