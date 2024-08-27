<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeMenu" router>
          <el-menu-item v-for="item in menuList" :index="item.path" :key="item.path">{{ item.meta.title }}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { useRouter,useRoute } from 'vue-router';
import Header from './components/Header.vue'

const router = useRouter()
const route = useRoute()

const menuList = router.getRoutes().filter(route => {
  return route.meta.isShow
})

const activeMenu = route.path
console.log('menuList',menuList);

</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
  margin-bottom: 5px;
}

.el-container {
  height: 100%;

  .el-menu {
    height: 100%;
  }
}
</style>