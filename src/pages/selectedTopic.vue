<script setup lang="ts">
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
        return true
      }
    })
  }

  const shows = ref(false)
  const answerb =  ref() 
  const onGoSpan = () => {
    shows.value = true
    answerb.value!.getSubject(true)
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

  <Answer ref="answerb" :shows="shows" :subjectList="onData" @onshows="shows = $event"/>

</template>

<style src="../scss/selectedTopic.scss" scoped />
