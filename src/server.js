import http from "http"
import url from "url"
import querystring from 'querystring'
import Router from './router.js'
import DaoHelper from './helper/DaoHelper.js'
import formidable from 'formidable'
import path from 'path'

export default class Server {

  startServer() {
    http.createServer((req, res) => {
      if (req) {
        let method = req.method
        let params
        let pathname
        let body = ''
        if (method === 'GET') {
          params = url.parse(req.url, true).query
          pathname = url.parse(req.url, true).pathname
          this.handleReqRes(pathname, params, body, res)
        } else if (method === 'POST') {
          let isFormData = (req.headers['content-type']).includes('multipart/form-data')
          if (isFormData) {
            this.handleFormDataParse(req, res)
          } else {
            req.on('data', chunk => {body += chunk})
            req.on('end', () => {
              body = querystring.parse(body)
              params = url.parse(req.url, true).query
              pathname = url.parse(req.url, true).pathname
              params = Object.keys(params).length < 1 ? undefined : params
              this.handleReqRes(pathname, params, body, res)
            })
          }
        }
      }
    }).listen(21654)
  }

  handleFormDataParse(req, res) {
    let form = new formidable.IncomingForm()
    let targetDir = path.join(__dirname, '../pic/target')
    let pathname = url.parse(req.url, true).pathname
    let params = undefined
    let body
    // 检查目标目录，不存在则创建
    DaoHelper.mkDirs(targetDir)
    form.uploadDir = targetDir
    form.encoding = 'utf-8'
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
      } else {
        body = fields
        body['img_res'] = files.img_res.path
        this.handleReqRes(pathname, params, body, res)
      }
    })
  }

  handleReqRes(pathname, params, body, res) {
    let router = new Router()
    let event = DaoHelper.buildEvents()
    event.on('serviceCB', result => {
      res.writeHead(200, {"Content-Type": "application/json"})
      res.end(result)
      console.log(result)
    })
    router.handleParams(pathname, params, body, event)
  }
}