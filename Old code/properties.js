const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
   const find = req.url.split('/')[1]

   console.log(req.url)

   if(!fs.existsSync(find)){
      res.statusCode = 404
      return res.end()
   }
   res.end(fs.readFileSync(find))
})

server.listen('9090', () => console.log('Server online'))