export default {
  path: '/',
  name: 'layout',
  component: () => import('@/layout/index.vue'),
  meta: {
    role: ['common', 'admin'],
    parentRouter: 'Home'
  },
  children: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: "首页",
        isShow: true,
        parentRouter: 'Layout'
      },
    },
    {
      path: '/p',
      name: 'ParentPage',
      meta: {
        title: "父菜单",
        isShow: true,
        parentRouter: 'Layout'
      },
      children: [
        {
          path: '/p/child1',
          name: 'ChildPage1',
          meta:{
            isShow: true,
            title: '子菜单1',
            parentRouter: 'ParentPage'
          }
        },
        {
          path: '/p/child2',
          name: 'ChildPage2',
          meta:{
            isShow: true,
            title: '子菜单2',
            parentRouter: 'ParentPage'
          }
        },
        {
          path: '/p/child3',
          name: 'ChildPage3',
          meta:{
            isShow: true,
            title: '子菜单3',
            parentRouter: 'ParentPage'
          }
        },
      ]
    },
    {
      path: '/project',
      name: 'projectPage',
      component: () => import('@/views/project/index.vue'),
      meta: {
        title: "项目介绍",
        isShow: true,
        parentRouter: 'Layout'
      },
    },
    {
      path: '/user',
      name: 'UserPage',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: "用户模块",
        isShow: true,
        parentRouter: 'Layout'
      },
    },
    {
      path: '/role',
      name: 'RolePage',
      component: () => import('@/views/role/index.vue'),
      meta: {
        title: "角色模块",
        isShow: true,
        parentRouter: 'Layout'
      },
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('@/views/auth/index.vue'),
      meta: {
        title: "权限模块",
        isShow: true,
        parentRouter: 'Layout'
      },
    },
  ],
}
