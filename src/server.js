import http from "http"
import url from "url"
import querystring from 'querystring'
import Router from './router.js'
import DaoHelper from './helper/DaoHelper.js'
import formidable from 'formidable'
import path from 'path'
import fs from 'fs'

const sharp = require('sharp')

export default class Server {

  startServer() {
    http.createServer((req, res) => {
      if (req) {
        let method = req.method
        let params
        let pathname
        let body = ''
        if (method === 'GET') {
          console.log('/////////request method is GET//////////')
          params = url.parse(req.url, true).query
          pathname = url.parse(req.url, true).pathname
          this.handleReqRes(pathname, params, body, res)
        } else if (method === 'POST') {
          console.log('/////////request method is POST/////////')
          console.log('content type is', req.headers['content-type'])
          let isFormData = (req.headers['content-type']).includes('multipart/form-data')
          if (isFormData) {
            this.handleFormDataParse(req, res)
          } else {
            req.on('data', chunk => {
              body += chunk
            })
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

  /*处理表单提交的数据解析*/
  handleFormDataParse(req, res) {
    let form = new formidable.IncomingForm()
    let targetDir = path.join(__dirname, '../pic/target') // 大图存放目录
    let targetSmallDir = path.join(__dirname, '../pic/targetSmall') // 小图存放目录
    let pathname = url.parse(req.url, true).pathname
    let params = undefined
    let body
    // 检查目标目录，不存在则创建
    DaoHelper.mkDirs(targetDir)
    DaoHelper.mkDirs(targetSmallDir)
    form.uploadDir = targetDir
    form.encoding = 'utf-8'
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
      } else {
        body = fields
        console.log(body)
        if (files && files.img_res) { // 存在文件对象且文件对象中的img_res字段不为空，处理图片
          // 修改文件后缀名
          let oldpath = files.img_res.path
          let newpath = `${files.img_res.path}.jpg`
          fs.rename(oldpath, newpath, (err) => {
            if (err) body['img_res'] = undefined
            // 生成可用图片链接
            body['img_res'] = `http://54.238.237.51${DaoHelper.getRelativePath(files.img_res.path)}.jpg`
            // 生成小图
            this.genSmallImg(`${files.img_res.path}.jpg`, path.join(__dirname, '../pic/target'))
            // 生成可用小图片链接
            body['img_res_small'] = `http://54.238.237.51${DaoHelper.getRelativePath(files.img_res.path)}_small.jpg`
            this.handleReqRes(pathname, params, body, res)
          })
        } else { // 文件对象为空或文件对象中无img_res字段
          this.handleReqRes(pathname, params, body, res)
        }
      }
    })
  }

  /*
  生成小图
  imgPath:被处理图像的本机地址
  filePath:小图需要被存放到的位置
  */
  genSmallImg(imgPath, filePath) {
    console.log(`imgPath is ${imgPath}, filePath is ${filePath}`)
    let needHandle = this.isJPG(imgPath)
    DaoHelper.mkDirs(filePath)
    if (needHandle) {
      sharp(imgPath).resize(320).toFile(`${filePath}/${this.getImgName(imgPath)}_small.jpg`, (err) => {
        console.log(err)
      })
      console.log(`final destination is: ${filePath}/${this.getImgName(imgPath)}_small.jpg`)
    }
  }

  // 获取文件名
  getImgName(imgPath) {
    let startIndex = imgPath.lastIndexOf('/') + 1
    let endIndex = imgPath.lastIndexOf('.')
    return imgPath.substring(startIndex, endIndex)
  }

  // 是否为jpg文件
  isJPG(fileDir) {
    let fileExtension = fileDir.substring(fileDir.lastIndexOf('.') + 1, fileDir.length)
    console.log(`file extension is ${fileExtension}`)
    return fileExtension === 'jpg'
  }

  // 处理请求
  handleReqRes(pathname, params, body, res) {
    let router = new Router()
    let event = DaoHelper.buildEvents()
    event.on('serviceCB', result => {
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
      res.writeHead(200, {
        "Content-Type": "application/json"
      })
      res.end(result)
      console.log(result)
    })
    router.handleParams(pathname, params, body, event)
  }
}