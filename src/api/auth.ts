import { get } from '@/http/request'
export const getAuthList = async (data) => {
  return get({},'getAuthList',data)
}