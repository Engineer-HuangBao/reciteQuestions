<script setup  lang="ts">
  import { ref, getCurrentInstance, onBeforeMount, onMounted } from 'vue'
  const { $https } = getCurrentInstance().appContext.config.globalProperties
  const aa = () => {
    $https('getList', {cheshi: 123})
  }
  let data = [
    { name: 'Html5', key: 'Html5' , title: '解释解释解释解释解', on: true },
    { name: 'Css3', key: 'Css3' , title: '解释解释解释解释解', on: true },
    { name: 'App', key: 'App' , title: '解释解释解释解释解', on: true },
    { name: 'JavaScript', key: 'JavaScript' , title: '解释解释解释解释解', on: false },
    { name: 'Webpack', key: 'Webpack' , title: '解释解释解释解释解', on: false },
    { name: 'Vite', key: 'Vite' , title: '解释解释解释解释解', on: false },
    { name: 'WechatApplet', key: 'WechatApplet' , title: '解释解释解释解释解', on: false },
    { name: 'NodeJs', key: 'NodeJs' , title: '解释解释解释解释解', on: true },
    { name: 'MySQL', key: 'MySQL' , title: '解释解释解释解释解', on: false },
    { name: 'Java', key: 'Java' , title: '解释解释解释解释解', on: false },
    { name: 'C++', key: 'C++' , title: '解释解释解释解释解', on: false },
  ]
</script>

<template>
  <h1 @click="aa"><span>请选择提纲</span></h1>
  <article>
    <div v-for="(item, index) in data">
      <span :class="['iconfont me', item.on ? 'onIconfont' : '']">&#xe78e;</span>
      {{ item.name }}
      <p>{{ item.title }}</p>
    </div>
  </article>
  
  
  
</template>


<style src="./answer.scss" scoped />
