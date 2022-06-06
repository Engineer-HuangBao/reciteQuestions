const fs = require('fs')
const http = require('http')
const querystring = require('querystring')

let port = 3022 // 服务器端口号

let fromData = {
  html: {}, css3: {}, javaScript: {}, react: {}, vue: {}, angular: {},
  wechatApplet: {}, app: {},webpack: {}, vite: {}, nodeJs: {}, 
  java: {}, 'c++': {}, php: {}, mySQL: {}, git: {}
}

function initializationData () {
  Object.keys(fromData).map(item => {
    fs.readFile('./serve/dataBase/' + item + '.json','utf8', function(err, datastr){
      let init = {
        "title": datastr ? JSON.parse(datastr)['title'] : "备注注解",
        "name": item.slice(0,1).toUpperCase() +item.slice(1).toLowerCase(),
        "key": item,
        "data": datastr ? JSON.parse(datastr)['data'] : [],
        "isChoice": datastr ? JSON.stringify(JSON.parse(datastr)['data']) != '{}' : false
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
    if (req.url === '/detailsAdd') return detailsAdd(postParams, res)
    if (req.url === '/detailsEdit') return detailsEdit(postParams, res)
    if (req.url === '/detailsDelete') return detailsDelete(postParams, res)
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

function detailsAdd(params, res) {
  if (!params) return res.end('')
  let data = JSON.parse(params)
  let keyNum = fromData[data.key].data.length ? fromData[data.key].data[fromData[data.key].data.length - 1].key.split(data.key)[1] : 0
  data.data.map(item => {
    keyNum++
    let setData = {
      answerTimes: item.answerTimes || '',
      frequentProblems: item.frequentProblems || '',
      rightAndWrongTimes: item.rightAndWrongTimes || '',
      modify: item.modify || '',
      name: item.name || '',
      key: data.key + keyNum,
      answer: item.answer || ''
    }
    fromData[data.key].data.push(setData)
  })
  fs.writeFile('./serve/dataBase/'+ data.key + '.json', JSON.stringify(fromData[data.key]) ,'utf8',(err,data)=> {
    if (err) return res.end(JSON.stringify({"code": 0, "msg": "新增失败！请检查代码或联系管理员"}))
    res.end(JSON.stringify({"code": 1, "msg": "新增成功！"}))
  })
}

function detailsEdit(params, res) {
  if (!params) return res.end('')
  let data = JSON.parse(params)
  let dataIndex = null
  fromData[data.key].data.some((item, index) => {
    if (item.key !== data.data.key) return
    dataIndex = index
    return true
  })
  data.data.modify = true
  fromData[data.key].data.splice(dataIndex, 1, data.data)
  fs.writeFile('./serve/dataBase/'+ data.key + '.json', JSON.stringify(fromData[data.key]) ,'utf8',(err,data)=> {
    if (err) return res.end(JSON.stringify({"code": 0, "msg": "修改失败！请检查代码或联系管理员"}))
    res.end(JSON.stringify({"code": 1, "msg": "修改成功！"}))
  })
}

function detailsDelete(params, res) {
  if (!params) return res.end('')
  let data = JSON.parse(params)
  let dataIndex = null
  fromData[data.key].data.some((item, index) => {
    if (item.key !== data.data.key) return
    dataIndex = index
    return true
  })
  fromData[data.key].data = [...fromData[data.key].data.slice(0, dataIndex), ...fromData[data.key].data.slice(dataIndex + 1, fromData[data.key].data.length) ]
  fs.writeFile('./serve/dataBase/'+ data.key + '.json', JSON.stringify(fromData[data.key]) ,'utf8',(err,data)=> {
    if (err) return res.end(JSON.stringify({"code": 0, "msg": "删除失败！请检查代码或联系管理员"}))
    res.end(JSON.stringify({"code": 1, "msg": "删除成功！"}))
  })
}


server.listen(port)
console.log('服务器已启动 - Local: http://localhost:' + port)







 
//  