/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-expect-error
global.wx = {
  getStorageSync: localStorage.getItem.bind(localStorage),
  setStorageSync: localStorage.setItem.bind(localStorage),
  showToast: ({ title }: any) => {
    throw new Error(title)
  },
}
