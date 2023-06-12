import { defineStore } from 'pinia'
export const useStore = defineStore('storeId', {
  // 推荐箭头函数形式
  state: () => {
    return {
      // 会自动推断类型，这里定义的是默认值
      count: 0,
      name: 'xj',
      isAdmain: true,
    }
  },
})
