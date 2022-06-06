<script setup  lang="ts">
  import { ref, getCurrentInstance, onBeforeMount, onMounted } from 'vue'
  const { $https, $router } = getCurrentInstance().appContext.config.globalProperties
  const state = ref({
    onList: ''
  })
    

  // 列表
  const listData = ref([])
  onBeforeMount(() => {
    $https('getList').then(res => {
      listData.value = res
      console.log(res)
    })
  })

  // 题目
  const listDetails = ref({})
  const page = ref(1)
  const onListP = item => {
    state.value.onList = item.key
    $https('details', {"key": item.key}).then(res => {
      listDetails.value = { ...res }
      editRow.value = {}
    })
  }
  // 选中题目数据
  const editRow = ref({})
  const tableOnClick = item => {
    if (JSON.stringify(editRow.value) !== '{}' && editRow.value.key === item.key) return editRow.value = {}
    editRow.value = { ...item }
  }
  // 新增题目
  const rowAdd = () => {
    if (!listDetails.value['key']) return alert('请先选择提纲！')
    if (editRow.value['key']) return alert('请先取消题目选中数据！（再次点击选中数据即可）')
    const name = editRow.value['name']
    const answer = editRow.value['answer']
    if (!name || !answer) return alert('请先输入题目与内容！')
    const data = {...listDetails.value, data: [{name, answer}]}
    $https('detailsAdd', data).then(res => {
      onListP(data)
    })
  }
  // 修改题目
  const rowEdit = () => {
    if (!listDetails.value['key']) return alert('请先选择提纲！')
    if (!editRow.value['key']) return alert('请先选择题目！')
    const name = editRow.value['name']
    const answer = editRow.value['answer']
    if (!name || !answer) return alert('请先修改题目与内容！')
    const data = { ...listDetails.value, data: { ...editRow.value, name, answer }}
    $https('detailsEdit', data).then(res => {
      onListP(data)
    })
  }
  // 删除题目
  const rowDelete = () => {
    if (!listDetails.value['key']) return alert('请先选择提纲！')
    if (!editRow.value['key']) return alert('请先选择题目！')
    const data = { ...listDetails.value, data: { ...editRow.value }}
    $https('detailsDelete', data).then(res => {
      onListP(data)
    })
  }


  const baodemo = data => {
    if (!listDetails.value['key']) return alert('请先选择提纲！')
    let a = {
      "为何JS是单线程?异步怎么理解？": '1.因为js里有可视化的dom,若程序为多线程且同操作一个dom时便会冲突.2.异步相当于过了一个时间通过回掉函数创建了事件添加到事件列表等待执行，这里也相当于定时器设置了个具体时间然而实际执行时间会比预定的长一点， 要等队列执行到它了才会相应执行。',
      "什么是作用域,作用域链又是什么": '1.声明的函数或变量在可以使用的范围内就叫做作用域2.读取函数或者变量时,需要从局部作用域向上或到全局作用域的作用域合集即为作用域链',
      "什么是内存泄露、什么是垃圾回收机制": '-/ 已使用的内存未能及时的清理出来,导致其内存无法再使用这即为内存泄露.//  - 为什么会导致维持泄漏?  答: 内存泄露指已声明的函数或变量已经无法读取,且垃圾回收机制以为该对象还在被引用,因此垃圾回收机制不会释放该对象,最终积少成多用完了内存便会卡顿乃至崩溃.-/ 垃圾回收机制是用来清理与释放不再使用的数据内存,有两种策略方式//  - 标记清除法:      垃圾回收机制获取并且标记它们,然后访问并标记所有来自它们的引用,再然后反问这些对象并标记它们的引用.如此递进结束后发现没有标记的(不可达到的)进行删除,进入之下环境的不能删除//  - 引用计数法:      当声明一个变量并给该变量赋值一个应用类型的值时,该值的计数加一,当该值给另一个变量的生活,同理加一.当该值被其他值取代时,该值就减一.当计数值为零时,即说明无法返再访问该值了,垃圾回收机制及会删除该对象',
      "执行上下文": '在js解析到可执行函数的时候开始做一些准备工作, 其中执行上下文大体可分为3种1.全局执行上下文  — 这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 this 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。2.函数执行上下文  — 每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤。3.Eval函数执行上下文  — 执行在 eval 函数内部的代码也会有它属于自己的执行上下文，但由于 JavaScript 开发者并不经常使用 eval，所以在这里我不会讨论它。',
      "什么是闭包？它的作用是什么？": '// 1.闭包相当于就是一个大的函数体包着一个小函数体，并将小函数体进行会抛。（该类型为高阶函数）// 2.闭包可以使内部申明变量不会被销毁，就是不会被垃圾回收机制回收。因为是内部声明变量，不会担心与外界声明变量重复。缺点因为不会被垃圾回收机制回收所以会一直占用一定的内存（栈与堆）',
      "js中有哪些数据类型": '// js中数据类型可分为两种,分别为基础数据类型、引用数据类型一. 基础数据类型 // 基本数据类型的数据直接存储在栈中1.number (数字类型)2.string (字符串类型)3.boolean (布偶类型)4.null (空类型)5.undefined (空类型)6.symbol (es6的新增类型)7.bigInt (正则类型)二.引用类型 // 数据存储在堆中,在栈中保存数据的引用地址,该引用地址指向对应的数据(堆内),以便快速查找到堆内存中的对象1.object (对象类型)2.array (数组类型)3.data (日期类型)4.function (函数类型)5.regexp ()// 栈内存是自动分配的;而堆内存是动态分配的,且不会自动释放,所以每次使用完对象的时候都要把它设置为null,从而减少不用的内存消耗',
      "为什么 typeof null 是 Objec": '1.因为js类型存储都是已二进制来进行存储的,如果二进制前三位都是零的时,系统便会判断为object  - 000 - 对象类型  - 001 - 整型  - 010 - 双精度类型  - 100 - 字符串型  - 110 - 布尔型',
      " 类型检测的办法有哪些,分别作用是什么": '1.typeof // 判断基础类型, 无法识别具体的[]、null2.instanceof // 判断判断是否在对象原型上3.constructor // 构造函数时候会将该构造函数赋在constructor上,然后根据constructor4.Object.prototype.toString.call',
      "2个js文件怎么通信?" : '// bao1.jsexport default function bao1(port) {    let data = { message: ""信息, from: "bao1" }  port.postMessage(data);}// bao2.jexport default function bao2(port)   port.onmessage = i =>         console.log(i.data)    }// index.jsimport bao1 from "./bao1.js";import bao2 from "./bao2.js";const { port1, port2 } = new MessageChannel();baob2(port2);bao1(port1);',
      "运算符可分为几大类": '1.运算符(+-*=/++--)2.赋值运算符(=+=-=*=/=%=)3.比较运算符(==!=!==><>=<=?===)4.逻辑运算符(&&||!)5.类型运算符(typeof\instanceof)',
      "有哪些循环": ' let neiRong = 当前数组/index/原数组 1.for (条件循环体) 2.forEach (数组: neiRong) 3.for-in (对象: 返回对象名, 数组: 返回下标) 4.for-of (适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合: 返回内容) 5.while (条件循环体) 6.do-while (条件循环体至少循环一次) 7.map (数组: "neiRong"; return 内容; 形成新数组) 8.some (数组: "neiRong"; 可"return true"跳出循环; 返回"true/false") 9.every (数组: "neiRong"; 当"return false"跳出循环; 返回"true/false") 10.find (数组: "neiRong"; 可"return true"跳出循环; 返回当前循环内容) 11.findIndex (数组: "neiRong"; 可"return true"跳出循环; 返回当前下标) 12.filter (数组: "neiRong"; 可"return true/false"; 返回true的形成新数组) 13.reduce (数组: 挂载值/"neiRong"; 体系内"return 内容"赋给挂载值; 返回最终挂载值) 14.reduceRight (与reduce区别一个是从头往后,reduceRight从后往前; 其它与reduce一致) 15.includes (数组: 第一个参数传入查找内容,第二个内容传入开始的下标; 返回"true/false") 11.keys (数组: 返回代送对象-内容为下标,可配合for-of使用) 12.values (数组: 返回代送对象-内容为内容,可配合for-of使用) 13.entries (数组: 返回代送对象-内容为下标和内容,可配合for-of使用) 14.flat (num/Infinity) (使多维数组变为一维) 15.flatMap ([1,2,3].flatMap(x => [x*2])) ',
      "字符串, 数组, 对象常用的API": ' // 字符串 && 数组 1.length // 获取长度 2.slice // 切合开始位置或指定位置 3.indexOf // 返回查找内容下标 4.lastIndexOf // 返回查找内容下标,第二个参数是查找长度 // 字符串 && 对象 1.from // 将对象內的内容合并成数组(无声明name/key),有回抛 // 字符串 1.trim // 去除前后空格 2.split // 以传入内容切割成字符串,可设置切割间隔 3.concat // 拼接 4.charAt // 返回指定下标的内容 5.charCodeAt // 返回指定下表内容的编码 6.substr // 切割开始位置或则开始位置与结束长度 7.substring // 返回开始位置或则开始位置与结束位置 8.search // 正则查找内容 9.toUpperCase // 转大写 10.toLowerCase // 转小写 11.replace // 查找替换内容,可正则 12.toString // 转为字符串 // 数组 1.join // 以传入内容拼接成字符串 2.push // 数组尾部添加 3.pop // 删除最后一个 4.splice // 切割 5.reverse //倒叙 6.sort // 排序 7.isArray // 判断是否是数组 8.toLocaleString // 转为字符串 9.concat // 连接数组 // 对象 assign // 合并对象以后者迭代 ',
      "es6有哪些新特性": ' 1.let、const: 声明变量 //- 都是局部内函数内只能声明一次,所谓的块级作用域.const声明的变量不可改变 2....: 预解析 - 类似张开了数组(张开运算符) 3.``: 字符串模版 - 他与字符串的区别在于可以用${}来添加占位符,可输入如变量、三目运算 4.[]: 结构数组 - ["name"]=[name],单独拿出name 5.{}: 结构对象 - {"name"}={name:123,eag:123},单独拿出name 6.{xx}: 字面量 - 指可以将变量直接赋成键值对,bao = 123,baobao = { bao } // => { bao: 123 } 7.=>: 箭头函数 - 可分为有花括号的常规主体写法和无花括号的简写主体语法 8.new: 实例化 ',
      "axios/ajax是什么怎么使用": ' `-原生ajax-` // 1.创建一个 XMLHttpRequest 类型的对象 兼容写法 var xhr = null; // 标准浏览器 -- IE 6 浏览器 if (window.XMLHttpRequest) { xhr = new XMLHttpRequest(); } else { xhr = new ActiveXObject("Microsoft.XMLHTTP"); } // 2.open() 方法开启请求 xhr.open("POST","https://jsonplaceholder.typicode.com/users"); // 设置请求头 // 一般 get 方法不需要设置，而 post 方法必须设置 xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); // 3.send() 方法发送一次请求 // 如果是 get 方法请求，不需要再 send 中传参数，它如果想传参数，直接写在网址上 // xhr.send(null); xhr.send("name=harry&age=19"); xhr.onreadystatechange = function () {   // 通过判断 xhr 的 readyState ，确定此次请求是否完成   if (this.readyState === 4) {     console.log(this.responseText)   } } `-axios-` axios({   url: "/posts",   method: "get",   baseURL: "http://localhost:3000",   params: {     id: 1   } }).then(function(res){   console.log(res.data) })  ',
      
    }
    // "": ' 1.async/await //- async function baoDemo() { //-   var a = await '1' //-   var b = await new Promise((resolve, reject) => { //-     setTimeout(function () { //-       resolve('2') //-      }, 3000) //-   }) //-   var c = '3' //-   console.log(a, b, c); //- } //- baoDemo() // 1,2,3 ',
    //   "防抖与节流": ' // 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。 function debounce(func, wait) {     let timeout;     return function () {         const context = this;         const args = arguments;         clearTimeout(timeout)         timeout = setTimeout(function(){             func.apply(context, args)         }, wait);     } } // 节流：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。 function throttle(func, wait) {   let context, args;   let previous = 0;   return function () {     let now = +new Date();     context = this;     args = arguments;     if (now - previous > wait) {       func.apply(context, args);       previous = now;     }   } } ',



    Object.keys(a).map(key => {
      const name = key
      const answer = a[key]
      const data = {...listDetails.value, data: [{name, answer}]}
      $https('detailsAdd', data).then(res => {
          console.log(key, res.msg)
      })
    })
  }
</script>

<template>
  <div class="modify">
    <div class="left">
      <div class="list boxShadow">
        <p
          v-for="(item, index) in listData"
          :key="index"
          :class="[state.onList === item.key ?  'onP' : '', 'hover']"
          @click="onListP(item)"
        >{{ item.name }}</p>
      </div>
      <div class="btns boxShadow cursor">
        <span class="hover">新增</span>
        <span class="hover">修改</span>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <span @click="baodemo" v-html="listDetails.key ? listDetails.key + ',' + listDetails.title : '请选择提纲'"></span>
        <div class="boxShadow search">搜索</div>
      </div>
      <div class="boxShadow table">
        <table border="0" cellspacing="0">
          <thead>
            <tr>
              <th>名字</th>
              <!-- <th>答题次数</th> -->
              <!-- <th>常问题</th> -->
              <!-- <th>对错次数</th> -->
              <th>自主修改</th>
              <th class="modify">答案</th>
            </tr>
          </thead>
          <tfoot>
            <tr
              v-for="(item, index) in listDetails['data'] || []"
              :class="[editRow.key === item.key ?  'onTr' : '', 'hover']"
              :key="index"
              @click="tableOnClick(item)"
            >
              <td>{{ item.name || '' }}</td>
              <!-- <td>{{ item.answerTimes || '' }}</td> -->
              <!-- <td>{{ item.frequentProblems || '' }}</td> -->
              <!-- <td>{{ item.rightAndWrongTimes || '' }}</td> -->
              <td>{{ item.modify ? '已自定义' : '未自定义' }}</td>
              <td class="modify">{{ item.answer || '' }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <input class="boxShadow subject" v-model="editRow.name" />
      <textarea class="boxShadow answer" v-model="editRow.answer" />
      <div class="boxShadow btns">
        <!--<div class="paging cursor">
          <span><input type="text" v-model="page"> / 20</span>
          <span class="hover">上一页</span>
          <span class="hover">下一页</span>
        </div> -->
        <div class="operation cursor">
          <span class="hover" @click="rowAdd">新增</span>
          <span class="hover" @click="rowEdit">修改</span>
          <span class="hover" @click="rowDelete">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../scss/modify.scss" scoped />

