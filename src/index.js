import UserService from './service/UserService.js'

// testAddUser()
// testDeleteUser()
// updateUser()
queryUser()

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