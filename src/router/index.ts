import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useSettingStore } from '@/store/setting';
import { getTitle } from '@/utils';
import { title } from 'process';
const settingStore = useSettingStore();

export const aboutRouter = {
  path: '/about',
  name: 'about',
  component: () => import('@/views/about/index.vue'),
  meta: {},
  children: [],
} as RouteRecordRaw

//组合路由信息
// import.meta.glob 为vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
  eager: true,
})
// const routes: Array<RouteRecordRaw> = [
//   {
//     path:'/',
//     name: 'home',
//     component: () => import('../views/home/index.vue'),
//     meta:{},
//     children: [],
//   }
// ]

const routes: Array<RouteRecordRaw> = []
Object.keys(modules).forEach((key) => {
  const module = modules[key].default
  routes.push(module)
})
routes.push(aboutRouter)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const handleRouters = (currentName: string) =>{
  const titles = getTitle(currentName,router.getRoutes())
  settingStore.setTitle(titles)
}

const noStatusPage = ['/login', '/about']
router.beforeEach(async (_to, _from, next) => {
  Nprogress.start()
  const userIsLogin = sessionStorage.getItem('userInfo')
  if (userIsLogin || noStatusPage.includes(_to.path)) {
    next()
  } else {
    next('/login')
  }
  handleRouters(_to.name as string)
})

router.afterEach((_to) => {
  Nprogress.done()
})

export default router
