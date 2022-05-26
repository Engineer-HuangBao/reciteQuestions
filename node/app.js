const fs = require('fs')
const http = require('http')
const querystring = require('querystring')
let port = 3022 // 服务器端口号



// let datastr = null


// fs.readFile('./node/ceshi.json','utf8', function(err,datastr){
//   if (err) return  console.log('文件读取失败');
//   console.log('读取前：' + JSON.parse(datastr))
//   this.datastr = datastr
//   //  5.调用fs.writeFile()方法,把处理完毕后的成绩
//   // fs.writeFile('./node/ceshi.json', JSON.stringify({'宝': "娃"}),function(err){
//   //   // 读取失败 err的值也是为空  null转换为布尔值还是false
//   //   if (err) {
//   //     return console.log(err+'写入失败的');
//   //   }
//   //   console.log('成绩写入成功');
//   // })
// })

const app = http.createServer()
app.on('request', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header('Access-Control-Allow-Headers', ['mytoken','Content-Type']);
  res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
  console.log('嘿嘿嘿')
  let datastr = null
  
  fs.readFile('./node/ceshi.json','utf8', function(err,datastr){
    if (err) return  console.log('文件读取失败');
    //  5.调用fs.writeFile()方法,把处理完毕后的成绩
    // fs.writeFile('./node/ceshi.json', JSON.stringify({'宝': "娃"}),function(err){
    //   // 读取失败 err的值也是为空  null转换为布尔值还是false
    //   if (err) {
    //     return console.log(err+'写入失败的');
    //   }
    //   console.log('成绩写入成功');
    // })
    console.log(datastr)
    res.end(`${JSON.stringify(JSON.parse(datastr))}`)
  })
})
// const server = http.createServer((req, res) => {
//   const url = req.url
//   res.end(`<h1>hello world<h1>`)
// })
app.listen(port)
console.log('服务器已启动 - Local: http://localhost:' + port)







 
 