<script setup  lang="ts">
  import { ref, getCurrentInstance, onBeforeMount, onMounted } from 'vue'
  const { $https } = getCurrentInstance().appContext.config.globalProperties

  const data = ref([])
  const aa = () => {
    $https('getList', {cheshi: 123}).then(res => {
      console.log(res)
    })
  }
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
