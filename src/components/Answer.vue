
<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'

  defineProps<{ msg: string }>()

  const answerTime = ref({ tiem: '0-0:0:0', startTime: new Date().getTime()})
  const presentTime = ref(new Date().toLocaleString())

  setInterval(() => {
    // 答题时间
    var endTime = new Date().getTime()
    var time = endTime - answerTime.value.startTime
    answerTime.value.tiem = `${Math.trunc(time / 86400000)}-${Math.trunc(time / 3600000 % 24)}:${Math.trunc(time / 60000 % 60)}:${Math.trunc(time / 1000 % 60)}`
    // 北京时间
    presentTime.value = new Date().toLocaleString()
  },1000)



 const demo1 = [
   'xxxxx是什么?', 'xxxxx怎么实现?', 'xxxxx原理?', 'xxxxx对么?',
   'xxxxx是干嘛用的?', 'xxxxx主要功能是什么?', 'xxxxx是什么?', 'xxxxx怎么实现?',
   'xxxxx原理?', 'xxxxx对么?', 'xxxxx是干嘛用的?', 'xxxxx主要功能是什么?',
   'xxxxx是什么?', 'xxxxx怎么实现?', 'xxxxx原理?', 'xxxxx对么?',
   'xxxxx是干嘛用的?', 'xxxxx主要功能是什么?', 'xxxxx是什么?', 'xxxxx怎么实现?',
   'xxxxx原理?', 'xxxxx对么?', 'xxxxx是干嘛用的xxxxx是干嘛用的xxxxx是干嘛用的xxxxx是干嘛用的?', 'xxxxx主要功能是什么?',
 ]


 const shortcutKey = (_this = this) => {
   let space = false
   document.onkeydown = e => {
     if (e.code === 'Space') return space = true
     if (!space) return
     console.log(e)
   }
   document.onkeyup = e => {
     if (e.code === 'Space') return space = false
   }
   
   console.log(12)
 }

 onBeforeMount(() => {
   shortcutKey ()
 })

 const ceshi = r => {
   console.log(r)
 }
</script>

<template>
  <div class="dialog">
    <header>
      <div class="articles">
        <span id="goback" class="iconfont me">&#xe762;</span>
        <ul>
          <li class="numberOfQuestions"><span>30</span> / <span>26</span> / <span>4</span></li>
          <li class="uplower"><span>时长</span><span>{{ answerTime.tiem }}</span></li>
          <li class="uplower"><span>北京时间</span><span>{{ presentTime }}</span></li>
          <li ><span id="end">结束答题</span></li>
        </ul>
      </div>
    </header>
    <div class="articleDiv">
      <div class="left">
        <p v-for="(item, index) in demo1">{{ item }}</p>
      </div>
      <div class="middle">
        <h2>xxxxxxxxx是干嘛用的?</h2>
        <textarea @keyup.enter.native="ceshi" name="textarea" cols="50" rows="10"></textarea>
        <div>
          答案
        </div>
      </div>
      <div class="right">
        <ul>
          <li>确认答题&nbsp;&nbsp;&nbsp;&amp;&amp;&nbsp;&nbsp;&nbsp;揭答案</li>
          <li>答题正确&nbsp;&nbsp;&nbsp;&amp;&amp;&nbsp;&nbsp;&nbsp;下一题</li>
          <li>答题错误&nbsp;&nbsp;&nbsp;&amp;&amp;&nbsp;&nbsp;&nbsp;下一题</li>
        </ul>
        <div>
          <span>空格 + 回车: 答题确认-出现答案</span>
          <span>空格 + Y: 答题正确-下一题</span>
          <span>空格 + N: 答题错误-下一题</span>
          <span>空格 + &lt;: 上一题</span>
          <span>空格 + &gt;: 下一题</span>
          <span>空格 + /: 回到最新一题</span>
        </div>
        <img src="" alt="广告席位">
      </div>
    </div>
  </div>
</template>

<style src="./answer.scss" scoped />
