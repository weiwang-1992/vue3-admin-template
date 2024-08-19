import { defineStore } from 'pinia'
import pinia from '@/store'
import { userLogin, refreshUserInfo } from '@/api/user'
import router from '@/router'

export interface UserState {
  username: string
  accessToken: string
  refreshToken?: string
  roles: Array<string>
}
export type LoginRequest = {
  username: string
  password: string
}

export const useUserStoreHook = defineStore('userInfo', {
  state: (): UserState => ({
    username: 'gengyun',
    accessToken: '',
    roles: ['common'],
  }),
  getters: {},
  actions: {
    storeUserLogin(data: LoginRequest) {
      return userLogin(data).then((res) => {
        this.username = res.username
        this.roles = res.roles
        this.accessToken = res.accessToken
        return res
      })
    },
    logout() {
      sessionStorage.removeItem('userInfo')
      this.accessToken = ''
      router.push('/login')
    },
    storeRefreshUserInfo() {
      if (this.username === 'gengyun' && this.accessToken != '') {
        refreshUserInfo({
          accessToken: this.accessToken,
        })
          .then((res) => {
            this.username = res.username
            this.roles = res.roles
            this.accessToken = res.accessToken
          })
          .catch(() => {
            this.accessToken = ''
          })
      }
    },
  },
  persist: {
    key: 'userInfo',
    storage: sessionStorage,
    paths: ['accessToken', 'username'],
  },
})

export function useUserStore() {
  return useUserStoreHook(pinia)
}
