<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import './App.scss'
const currentInstance = getCurrentInstance()

const { $router } = currentInstance.appContext.config.globalProperties
// export default {
//   setup(props, cxt) {

//   }
// }
const headers = [
  { name: '首页', key: '/', icons: '' },
  { name: '答题', key: 'answer', icons: '&#xe75b;' },
  { name: '友情资助', key: 'support', icons: '&#xe7c7;' },
]
const current = ref('/')
const onLis = (data) => {
  current.value = data.key
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
          :class=" current === item.key ? 'onLi' : ''"
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
  <router-view></router-view>
</template>
140.82.112.4 github.com
199.232.69.194 github.global.ssl.fastly.net
185.199.108.153 assets-cdn.github.com 
185.199.110.153 assets-cdn.github.com 
185.199.111.153 assets-cdn.github.com 
