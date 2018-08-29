import http from "http"
import url from "url"
import querystring from 'querystring'
import Router from './router.js'
import DaoHelper from './helper/DaoHelper.js'

export default class Server {

  startServer() {
    http.createServer((req, res) => {
      if (req) {
        let method = req.method
        let params
        let pathname
        let body
        if (method === 'GET') {
          params = url.parse(req.url, true).query
          pathname = url.parse(req.url, true).pathname
          this.handleReqRes(pathname, params, body, res)
        } else if (method === 'POST') {
          req.on('data', chunk => {body += chunk})
          req.on('end', () => {
            body = querystring.parse(body)
            params = url.parse(req.url, true).query
            pathname = url.parse(req.url, true).pathname

            params = Object.keys(params).length < 1 ? undefined : params
            console.log(params)
            console.log(pathname)
            console.log(body)
            this.handleReqRes(pathname, params, body, res)
          })
        }
      }
    }).listen(3002)
  }

  handleReqRes(pathname, params, body, res) {
    let router = new Router()
    let event = DaoHelper.buildEvents()
    event.on('serviceCB', result => {
      res.writeHead(200, {"Content-Type": "application/json"})
      res.end(result)
    })
    router.handleParams(pathname, params, body, event)
  }
}