import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/mock/api/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username !== body.password) {
        return {
          code: 1,
          message: '用户名或密码错误',
          data: {
            username: '',
            roles: [],
            accessToken: '',
          },
        }
      }
      if (body.username === 'gengyun') {
        return {
          code: 0,
          message: '登录成功',
          data: {
            username: 'gengyun',
            roles: ['admin'],
            accessToken: 'admin',
          },
        }
      } else {
        return {
          code: 0,
          message: '登录成功',
          data: {
            username: 'common',
            roles: ['common'],
            accessToken: 'common',
          },
        }
      }
    },
  },
  {
    // 获取用户信息的接口
    url: '/mock/api/getUserInfo',
    method: 'post',
    response: ({ body }) => {
      if (body.accessToken === 'gengyun') {
        return {
          code: 0,
          message: '登录成功',
          data: {
            username: 'gengyun',
            roles: ['admin'],
            accessToken: 'gengyun',
          },
        }
      } else if (body.accessToken === 'common') {
        return {
          code: 0,
          message: '登录成功',
          data: {
            username: 'common',
            roles: ['common'],
            accessToken: 'common',
          },
        }
      } else {
        return {
          code: 1,
          message: 'Token失效',
          data: {
            username: '',
            roles: [],
            accessToken: '',
          },
        }
      }
    },
  },
] as MockMethod[]
