const useStorage = <T>(key: string) => {
  let value: T = JSON.parse(wx.getStorageSync(key))

  const setValue = (v: T) => {
    wx.setStorageSync(key, JSON.stringify(v))
    value = v
  }
  return [() => value, setValue] as [() => T, (v: T) => void]
}

export default useStorage
