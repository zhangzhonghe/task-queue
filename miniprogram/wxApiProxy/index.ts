export const showToast = (text: string) => {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000,
  })
}
