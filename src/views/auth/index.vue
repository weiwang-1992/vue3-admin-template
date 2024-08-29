<template>
  <div>
    <el-tree 
      ref="treeRef"
      style="max-width: 600px"
      :data="treeData"
      show-checkbox
      :props="defaultProps"
      node-key="roleId"  
      :default-checked-keys="checkedKeys"  
      :check-strictly="true" 
    />
    <el-button type="primary" @click="handleAulth">修改权限</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAuthList } from '@/api/auth'

interface ITreeData {
  roleId: number;
  label: string;
  roleList?: ITreeData[];
}

let treeRef = ref<any>(null)
let treeData = ref<ITreeData[]>([])
let checkedKeys = ref<number[]>([])

const route = useRoute()
const { query } = route

if(query) {
  checkedKeys.value = query.auth
}

onMounted(() => {
  getAuthList().then(res => {
    treeData.value = res.data
  })
})

const defaultProps = {
  children: 'roleList',
  label: 'name',
}

const handleAulth = () => {
  console.log('tree-keys',treeRef.value.getCheckedKeys());
  console.log('tree-nodes',treeRef.value.getCheckedNodes());
  
}
</script>