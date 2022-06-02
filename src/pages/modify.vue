<script setup  lang="ts">
  import { ref, getCurrentInstance, onBeforeMount, onMounted } from 'vue'
  const { $https, $router } = getCurrentInstance().appContext.config.globalProperties
  const state = ref({
    onList: ''
  })
    

  // 列表
  const listData = ref([])
  onBeforeMount(() => {
    $https('getList').then(res => {
      listData.value = res
      console.log(res)
    })
  })

  // 详情
  const listDetails = ref([])
  const page = ref(1)
  const onListP = item => {
    state.value.onList = item.key
    $https('details', {"key": item.key}).then(res => {
      listDetails.value = res
      editRow.value = {}
    })
  }
  const editRow = ref({})
  const tableOnClick = item => {
    if (JSON.stringify(editRow.value) !== '{}' && editRow.value.key === item.key) return editRow.value = {}
    editRow.value = item
  }
  const rowAdd = () => {
    if (JSON.stringify(editRow.value) !== '{}') return console.log('请先取消表格内的选中数据！（再次点击选中数据即可）')
  }
  const rowEdit = () => {}
  const rowDelete = () => {}
  
</script>

<template>
  <div class="modify">
    <div class="left">
      <div class="list boxShadow">
        <p
          v-for="(item, index) in listData"
          :key="index"
          :class="[state.onList === item.key ?  'onP' : '', 'hover']"
          @click="onListP(item)"
        >{{ item.name }}</p>
      </div>
      <div class="btns boxShadow cursor">
        <span class="hover">新增</span>
        <span class="hover">修改</span>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <span v-html="listDetails.key ? listDetails.key + ',' + listDetails.title : '请选择提纲'"></span>
        <div class="boxShadow search">搜索</div>
      </div>
      <div class="boxShadow table">
        <table border="0" cellspacing="0">
          <thead>
            <tr>
              <th>名字</th>
              <!-- <th>答题次数</th> -->
              <!-- <th>常问题</th> -->
              <!-- <th>对错次数</th> -->
              <th>自主修改</th>
              <th>答案</th>
            </tr>
          </thead>
          <tfoot>
            <tr
              v-for="(item, index) in listDetails['data'] || []"
              :class="[editRow.key === item.key ?  'onTr' : '', 'hover']"
              :key="index"
              @click="tableOnClick(item)"
            >
              <td>{{ item.name || '' }}</td>
              <!-- <td>{{ item.answerTimes || '' }}</td> -->
              <!-- <td>{{ item.frequentProblems || '' }}</td> -->
              <!-- <td>{{ item.rightAndWrongTimes || '' }}</td> -->
              <td>{{ item.modify ? '已自定义' : '未自定义' }}</td>
              <td>{{ item.answer || '' }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <input class="boxShadow subject" v-model="editRow.name" />
      <textarea class="boxShadow answer">{{ editRow.answer }}</textarea>
      <div class="boxShadow btns">
        <div class="paging cursor">
          <span><input type="text" v-model="page"> / 20</span>
          <span class="hover">上一页</span>
          <span class="hover">下一页</span>
        </div>
        <div class="operation boxShadow cursor">
          <span class="hover" @click="rowAdd">新增</span>
          <span class="hover" @click="rowEdit">修改</span>
          <span class="hover" @click="rowDelete">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../scss/modify.scss" scoped />

