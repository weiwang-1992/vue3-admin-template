import { defineStore } from 'pinia'
import pinia from '@/store'

export const useSettingStoreHook = defineStore('SettingStore',{
  state: () => ({
    title: [] as string[]
  }),

  actions: {
    setTitle(title: string[]){
      this.title = title
    }
  }
})

export function useSettingStore() {
  return useSettingStoreHook(pinia);
}