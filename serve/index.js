const fs = require('fs')
const http = require('http')
const querystring = require('querystring')

let port = 3022 // 服务器端口号

let fromData = {
  html: {}, java: {}, css3: {}, javaScript: {},
  webpack: {}, vite: {}, wechatApplet: {}, nodeJs: {},
  app: {}, mySQL: {}, 'c++': {}, php: {},
}

function initializationData () {
  Object.keys(fromData).map(item => {
    fs.readFile('./serve/dataBase/' + item + '.json','utf8', function(err, datastr){
      let init = {
        "title": datastr ? JSON.parse(datastr)['title'] : "备注注解",
        "name": item.slice(0,1).toUpperCase() +item.slice(1).toLowerCase(),
        "key": item,
        "data": datastr ? JSON.parse(datastr)['data'] : {},
        "isChoice": JSON.stringify(JSON.parse(datastr)['data']) != '{}'
      }
      if (err) return fs.writeFile('./serve/dataBase/'+ item + '.json', JSON.stringify(init) ,'utf8',(err,data)=> fromData[item] = init)
      fromData[item] = init
    })
  })
}
initializationData()



const server = http.createServer()
server.on('request', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader('Access-Control-Allow-Headers', ['mytoken', 'token','Content-Type']);
  res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});



  let postParams = ''
  req.on('data',(parmas)=>{
    postParams += parmas
  })
  req.on('end',()=>{
    if (req.url === '/getList') return getList(res)
    if (req.url === '/details') return details(postParams, res)
  })
})

function getList(res) {
  let data = []
  Object.keys(fromData).map(item => data.push({...fromData[item], data: {}}))
  res.end(JSON.stringify(data))
}

function details(params, res) {
  if (!params) return res.end('')
  let data = fromData[JSON.parse(params).key]
  res.end(JSON.stringify(data))
}


server.listen(port)
console.log('服务器已启动 - Local: http://localhost:' + port)







 
 