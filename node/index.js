const fs = require('fs')
const http = require('http')
const querystring = require('querystring')

let port = 3022 // 服务器端口号

let fromData = {
  html: {},
  java: {},
  css3: {},
  javaScript: {},
  webpack: {},
  vite: {},
  wechatApplet: {},
  nodeJs: {},
  app: {},
  mySQL: {},
  'c++': {},
  php: {},
}

function initializationData () {
  Object.keys(fromData).map(item => {
    fs.readFile('./node/dataBase/' + item + '.json','utf8', function(err, datastr){
      console.log(Object.prototype.toString.call(JSON.parse(datastr)['data']))
      let init = {
        "title": datastr ? JSON.parse(datastr)['title'] : "备注注解",
        "name": item.slice(0,1).toUpperCase() +item.slice(1).toLowerCase(),
        "key": item,
        "data": datastr ? JSON.parse(datastr)['data'] : {},
        "isChoice": JSON.stringify(JSON.parse(datastr)['data']) != '{}'
      }
      if (err) return fs.writeFile('./node/dataBase/'+ item + '.json', JSON.stringify(init) ,'utf8',(err,data)=> fromData[item] = init)
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
  let datastr = null
  let url = req.url
  console.log(req.url)

  if (req.url === '/getList') return getList(res)
  if (req.url === '/add') res.end(`{a: 123}`)
  if (req.url === '/set') res.end(`{a: 123}`)
  
  // fs.readFile('./node/ceshi.json','utf8', function(err,datastr){
  //   if (err) return  console.log('文件读取失败');
  //   //  5.调用fs.writeFile()方法,把处理完毕后的成绩
  //   // fs.writeFile('./node/ceshi.json', JSON.stringify({'宝': "娃"}),function(err){
  //   //   // 读取失败 err的值也是为空  null转换为布尔值还是false
  //   //   if (err) {
  //   //     return console.log(err+'写入失败的');
  //   //   }
  //   //   console.log('成绩写入成功');
  //   // })
  //   console.log(datastr)
  //   res.end(`${JSON.stringify(JSON.parse(datastr))}`)
  // })
})

function getList(res) {
  res.end(`{a: 222222222}`)
  console.log(fromData)
}



server.listen(port)
console.log('服务器已启动 - Local: http://localhost:' + port)







 
 