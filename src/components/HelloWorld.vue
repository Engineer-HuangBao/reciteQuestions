<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
const list = ref()

const count = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("get","http://localhost:3022");
  xhr.send();
  xhr.onload = function(data){
    console.log(JSON.parse(xhr.responseText));
    console.log(list.value);
    list.value = JSON.parse(xhr.responseText)
    data.value = JSON.parse(xhr.responseText)
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ data }}</h1>
  <h1>{{ list }}</h1>
  <button type="button" @click="count">点我</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
