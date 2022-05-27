<script setup scoped lang="ts">
  import { ref, getCurrentInstance, onBeforeMount, onMounted } from 'vue'
  const { $router } = getCurrentInstance().appContext.config.globalProperties

  onBeforeMount(() => {
    console.log($router.currentRoute._value)
  })
  onMounted(() => {
    console.log($router.currentRoute._rawValue)
  })

  const headers = [
    { name: '首页', key: '/', icons: '', width: '100%' },
    { name: '答题', key: 'answer', icons: '&#xe75b;', width: '1200px' },
    { name: '自定义提纲', key: 'answer', icons: '&#xe6f6;', width: '1200px' },
    { name: '友情打赏', key: 'support', icons: '&#xe7c4;', width: '1200px' },
  ]
  const current = ref({key: '/'})
  const onLis = (data) => {
    current.value = data
    $router.push(data.key)
  }

</script>
<template>
  <header>
    <div class="articles">
      <ul>
        <li
          key="index"
          @click="onLis(item)"
          v-for="(item, index) in headers"
          :class=" current.key === item.key ? 'onLi' : ''"
        >
          <span class="iconfont" v-html="item.icons" />
          {{ item.name }}
        </li>
      </ul>
      <span class="iconfont me">&#xe7cf;</span>
      <span class="iconfont me">&#xe78d;</span>
      <span class="iconfont me">&#xe779;</span>
    </div>
  </header>
  <div class="articleDiv">
    <router-view></router-view>
  </div>
</template>

<style src="./App.scss" scoped />
