<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeMenu" router>
          <template v-for="item in menuList" :key="item.path">
            <el-menu-item v-if="!item.children" :index="item.path">
              <span>{{ item.meta!.title }}</span>
            </el-menu-item>
            <el-sub-menu v-else :index="item.path">
              <template #title>
                <span>{{ item.meta?.title }}</span>
              </template>
              <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
                <span>{{ subItem.meta!.title }}</span>
              </el-menu-item>
              </el-sub-menu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="item in settingStore.title" :key="item" :to="{ name: item }">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { useRouter,useRoute } from 'vue-router';
import Header from './components/Header.vue'
import { ArrowRight } from '@element-plus/icons-vue';
import { useSettingStore } from '@/store/setting';

const settingStore = useSettingStore();
console.log('settingStore',settingStore);

const router = useRouter()
const route = useRoute()

const menuList = router.options.routes[0].children?.filter(item => {
  return item.meta?.isShow
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

.el-breadcrumb {
  margin-bottom: 10px;
}
</style>