<script setup  lang="ts">
  import Answer from '../components/Answer.vue'
  import { ref, getCurrentInstance, onBeforeMount, onMounted } from 'vue'
  const { $https, $router } = getCurrentInstance().appContext.config.globalProperties
  const data = ref([])
  const onData = ref({})

  onBeforeMount(() => {
    $https('getList', {cheshi: 123}).then(res => {
      data.value = res
    })
  })
  
  const onChoose = row => {
    data.value.some(item => {
      if (item.isChoice && item.key === row.key) {
        item.onChoose = item.onChoose ? false : true
        item.onChoose ? onData.value[item.key] = true : delete onData.value[item.key]
        console.log()
        return true
      }
    })
  }
  const onGoSpan = () => {
  }
</script>

<template>
  <h1>
    <span v-if="JSON.stringify(onData) == '{}'">
      请选择提纲
      <i> - 可多选 - </i>
    </span>
    <span v-else class="onGoSpan" @click="onGoSpan">
      开始答题
    </span>
  </h1>
  <article>
    <div v-for="(item, index) in data" :class="!item.isChoice && 'noDrop'" @click="onChoose(item)">
      <span :class="['iconfont me', item.onChoose ? 'onIconfont' : '']">&#xe78e;</span>
      {{ item.name }}
      <p>{{ item.title }}</p>
    </div>
  </article>

  <Answer onData />

</template>


<style lang="scss" scoped>
h1 {
  margin-top: 20px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  span {
    display: inline-block;
    padding: 10px 50px;
    background: #dddddd98;
    border-radius: 99px;
    i {
      font-size: 13px;
    }
  }
  .onGoSpan {
    color: rgb(255 255 255 / 95%);
    background: rgb(87 157 255 / 77%);
  }
}
article {
  flex-wrap: wrap;
  padding: 20px 40px;
  justify-content: center;
  display: flex;
  font-size: 38px;
  div {
    user-select: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    min-width: 200px;
    margin: 20px;
    padding: 10px 20px;
    background: #dddddd98;
    .iconfont { font-size: 52.0px;} 
    .onIconfont { color: #006fffc4; }
  }
  p {
    font-size: 18px;
  }
}
</style>
