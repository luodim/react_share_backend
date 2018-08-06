var http = require("http");
var url = require("url");

export default class Server {
  startServer() {
  	http.createServer((req, res) => {
  	  if (req) {
  	    let method = req.method
  	    let u = req.url
  	    if (method === 'GET') {
          let params = url.parse(req.url, true).query
          let pathname = url.parse(req.url, true).pathname
          this.handlePathname(pathname)
  	    } else if (method === 'POST') {

  	    }
  	  }
      // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      // res.end(util.inspect(url.parse(req.url, true)));
    }).listen(3002);
  }

  handlePathname(pathname) {

  }
}