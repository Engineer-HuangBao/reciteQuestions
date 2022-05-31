<script setup  lang="ts">
  import { ref, getCurrentInstance, onBeforeMount, onMounted } from 'vue'
  const { $https, $router } = getCurrentInstance().appContext.config.globalProperties
  
  
  const listData = ref([])
  onBeforeMount(() => {
    $https('getList', {cheshi: 123}).then(res => {
      listData.value = res
      console.log(res)
    })
  })


  const state = ref({
    onList: ''
  })
  const onListP = item => {
    state.value.onList = item.key
  }
</script>

<template>
  <div class="modify">
    <div class="left">
      <div class="list boxShadow">
        <p
          v-for="(item, index) in listData"
          :key="index"
          :class="state.onList === item.key ?  'onP' : ''"
          @click="onListP(item)"
        >{{ item.name }}</p>
      </div>
      <div class="btns boxShadow cursor">
        <span>新增</span>
        <span>修改</span>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <span>Html, 超文本标记语言啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧啊吧</span>
        <div class="boxShadow search">搜索</div>
      </div>
      <div class="boxShadow table">表</div>
      <div class="boxShadow subject">题目</div>
      <div class="boxShadow answer">答案</div>
      <div class="boxShadow btns">按钮</div>
    </div>
  </div>
</template>

<style src="../scss/modify.scss" scoped />

