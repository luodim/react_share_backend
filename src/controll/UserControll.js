import UserService from '../service/UserService.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class UserControll {

  addUserId(userArray) {
    let service = new UserService()
    let event = DaoHelper.buildEvents()
    let eventName = 'addUserServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.addUserId(userArray, event, eventName)
  }

  deleteUserId(userArray) {
  	let service = new UserService()
    let event = DaoHelper.buildEvents()
    let eventName = 'deleteUserServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.deleteUserId(userArray, event, eventName)
  }

  verifyUserId(userId) {
  	let service = new UserService()
    let event = DaoHelper.buildEvents()
    let eventName = 'queryUserServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.verifyUserId(userId, event, eventName)
  }
}