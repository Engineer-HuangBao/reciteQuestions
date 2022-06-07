
<script setup lang="ts">
  import { ref, nextTick, getCurrentInstance, onBeforeMount, onBeforeUnmount } from 'vue'
  const { $https } = getCurrentInstance().appContext.config.globalProperties
  // 声明父方法
  const emit = defineEmits(['onshows'])
  const props = defineProps({
    shows: {
      type: Boolean,
      default: false
    },
    subjectList: {
      type: Object,
      default: {}
    }
  })

  // --------------------- 答题 ---------------------
  // 全部题目
  const subjects = ref([])
  const getSubject = (isInte = false) => {
    if (isInte) subjects.value = []
    $https('getSubject', { subjectList: Object.keys(props.subjectList), initial: isInte }).then(res => {
      if (!res.length) return alert('已经没有题目啦！太厉害了吧！结束答题吧！')
      const index = subjects.value.length
      subjects.value.push(...res)
      isSubjectIndex(index)
    })
  }
  // 当前选中题目
  const subject = ref({})
  const subjectIndex = ref(0)
  const onSubject = (row, index) => {
    subject.value = row
    subjectIndex.value = index
    nextTick(() => {
      document.getElementById('answered').focus()
    })
  }
  // 是否可选择该题
  const isSubjectIndex = index => {
    if (subjects.value.length <= index) return getSubject()
    onSubject(subjects.value[index], index)
  }
  // 确认答题
  const sure = () => {
    if (subject.value.answered) return
    subject.value.answered = true
  }
  // 答题正确
  const correctSubject = ref([])
  const correct = () => {
    if (!subject.value.answered && !subject.value.judge) return
    correctSubject.value.push(subject.value.key)
    subject.value.judge = 'correct'
    isSubjectIndex(subjectIndex.value + 1)
  }
  // 答题错误
  const errorSubject = ref([])
  const error = () => {
    if (!subject.value.answered && !subject.value.judge) return
    errorSubject.value.push(subject.value.key)
    subject.value.judge = 'error'
    isSubjectIndex(subjectIndex.value + 1)
  }
  // 下一题 
  const forward = () => {
    isSubjectIndex(subjectIndex.value + 1)
  }
  // 上一题 
  const backward = () => {
    if (subjectIndex.value <= 0) return
    isSubjectIndex(subjectIndex.value - 1)
  }
  

  // 按钮状态合集
  const btnState = ref({
    edit: true,
  })

  const demo = () => {
    console.log(subjects)
  }
  // --------------------- 事件 ---------------------
  // 监听组合键
  const shortcutKey = (_this = this) => {
    let space = false
    document.onkeydown = e => {
      if (props.shows && e.code === 'Space') return (space = true)
      if (!space) return
      switch(e.code){
        case 'Enter': sure(); break;
        case 'ShiftRight': correct(); break;
        case 'KeyN': error(); break;
        case 'Period': forward(); break;
        case 'Comma': backward(); break;
        default:
          console.log(e)
          break;
      }
    }
    document.onkeyup = e => props.shows && (e.code === 'Space') && (space = false)
  }

  const answerTime = ref({ tiem: '0-0:0:0', startTime: new Date().getTime()})
  const presentTime = ref(new Date().toLocaleString())
  // 计时器
  const setInt = setInterval(() => {
    // 答题时间
    var endTime = new Date().getTime()
    var time = endTime - answerTime.value.startTime
    answerTime.value.tiem = `${Math.trunc(time / 86400000)}-${Math.trunc(time / 3600000 % 24)}:${Math.trunc(time / 60000 % 60)}:${Math.trunc(time / 1000 % 60)}`
    // 北京时间
    presentTime.value = new Date().toLocaleString()
  },1000)


  // 挂载后
  onBeforeMount(() => {
    shortcutKey ()
  })
  // 销毁前
  onBeforeUnmount(() => {
    document.onkeydown = e => {}
    document.onkeyup = e => {}
    clearInterval(setInt)
  })

  // 函数回抛
  defineExpose({getSubject})
</script>

<template>
  <div class="dialog" v-show="shows">
    <header>
      <span id="goback" @click="emit('onshows', false)" class="iconfont me">&#xe762;</span>
      <ul>
        <li class="numberOfQuestions"><span>{{ correctSubject.length + errorSubject.length }}</span> / <span>{{ correctSubject.length }}</span> / <span>{{ errorSubject.length }}</span></li>
        <li class="uplower"><span>时长</span><span>{{ answerTime.tiem }}</span></li>
        <li class="uplower"><span>北京时间</span><span>{{ presentTime }}</span></li>
        <li ><span id="end">结束答题</span></li>
      </ul>
    </header>
    
    <div class="articleDiv">
      <div class="left boxShadow">
        <div :class="['hover', subject!['key'] === item.key ? 'onClick' : '']" v-for="(item, index) in subjects" @click="onSubject(item, index)">
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="middle">
        <h2 class="boxShadow">{{ subject.name }}</h2>
        <div class="userAnswers boxShadow">
          <textarea id="answered" :disabled="subject.answered" name="textarea" v-model="subject.userAnswers" />
        </div>
        <div class="boxShadow answer">
          <textarea v-if="subject.answered" :disabled="true" v-model="subject.answer" />
        </div>
      </div>
      <div class="right">
        <ul class="boxShadow">
          <li @click="sure" :class="!subject.answered ? '' : 'noDrop noBtn'">确认答题&nbsp;&nbsp;&nbsp;&amp;&amp;&nbsp;&nbsp;&nbsp;揭答案</li>
          <li :class="subject.answered && !subject.judge ? '' : 'noDrop noBtn'">答题正确&nbsp;&nbsp;&nbsp;&amp;&amp;&nbsp;&nbsp;&nbsp;下一题</li>
          <li :class="subject.answered && !subject.judge ? '' : 'noDrop noBtn'">答题错误&nbsp;&nbsp;&nbsp;&amp;&amp;&nbsp;&nbsp;&nbsp;下一题</li>
          <!--
          <li :class="subject.answered && subject.judge ? '' : 'noDrop noBtn'">修改提示答案</li>
          <li :class="subject.answered && subject.judge ? '' : 'noDrop noBtn'">确定修改提示答案</li>
          -->
        </ul>
        <div class="boxShadow">
          <span>空格 + 回车: 答题确认-出现答案</span>
          <span>空格 + Shift: 答题正确-下一题</span>
          <span>空格 + N: 答题错误-下一题</span>
          <span>空格 + &lt;: 上一题</span>
          <span>空格 + &gt;: 下一题</span>
          <span>空格 + /: 回到最新一题</span>
          <span>空格 + E: 修改提示答案</span>
          <span>空格 + S: 确定修改提示答案</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../scss/answer.scss" scoped />