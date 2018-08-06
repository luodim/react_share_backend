import TargetService from '../service/TargetService.js'
import DaoHelper from '../helper/DaoHelper.js'

export default class TargetControll {

  uploadTarget(name, code, img, comment, contributor) {
    let service = new TargetService()
    let event = DaoHelper.buildEvents()
    let eventName = 'uploadServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.uploadTargetData(name, code, imgS, '', comment, contributor, event, eventName)
  }

  getTargetData(unionId) {
    let service = new TargetService()
    let event = DaoHelper.buildEvents()
    let eventName = 'getTargetServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.getTargetData(unionId, event, eventName)
  }

  getTargetList(pageIndex, number, userId) {
    let service = new TargetService()
    let event = DaoHelper.buildEvents()
    let eventName = 'getTargetListServiceEvent'
    event.on(eventName, json => {
      console.log(`json is ${json}`)
    })
    service.getTargetList(pageIndex, number, userId, event, eventName)
  }
}