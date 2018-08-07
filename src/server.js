import http from "http"
import url from "url"
import querystring from 'querystring'
import Router from './router.js'

export default class Server {

  startServer() {
    http.createServer((req, res) => {
      if (req) {
        let method = req.method
        let params
        let pathname
        let router = new Router()
		if (method === 'GET') {
		  params = url.parse(req.url, true).query
		  pathname = url.parse(req.url, true).pathname
		  router.handleParams(req.url)
		} else if (method === 'POST') {
          let body = ''
          req.on('data', chunk => {
          	body += chunk
          })
		  req.on('end', () => {
		    body = querystring.parse(body)
		    console.log(body)
		    // router.handleParams(params)
		  })
		}
      }
    }).listen(3002)
  }


}