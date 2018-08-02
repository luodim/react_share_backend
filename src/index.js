import UserService from './service/UserService.js'
import TargetService from './service/TargetService.js'

// testAddUser()
// testDeleteUser()
// updateUser()
// queryUser()
// uploadTarget()
// deleteTarget()
// updateTarget()
// queryTarget()
getTargetList()

function getTargetList() {
  let target = new TargetService()
  target.getTargetList()
}

function queryTarget() {
  let target = new TargetService()
  target.getTargetData('0f7c44b0-c03d-4415-91fa-1772d9d20512')
}

function uploadTarget() {
  let target = new TargetService()
  let name = 'A Mi'
  let code = '666'
  let imgS = 'https://www.google.com/small'
  let imgB = 'https://www.google.com/big'
  let comment = 'this is girl is quite beautiful and skill is also good'
  let contributor = 'u43fff'
  target.uploadTargetData(name, code, imgS, imgB, comment, contributor)
}

function deleteTarget() {
  let target = new TargetService()
  target.deleteTargetData(['84a4e7b3-5a92-4794-83bd-d535f8a4cd7f', '6cb47f49-25d3-44f3-aafd-2562784e8231', '28b52dbc-cb4f-44c3-9e30-189ee04c7c52', 
    'd693c8cc-0cea-4e25-8efa-900f080a92f6', 'bc2d7366-d0c8-400a-9193-efcddd8026d7', 'fe40d6f1-69f5-4c3f-8343-1e40d1062437'])
}

function updateTarget() {
  let target = new TargetService()
  target.updateTargetData('0f7c44b0-c03d-4415-91fa-1772d9d20512', ['img_res_small', 'img_res_big', 'comment'], ['a', 'b', 'c'])
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