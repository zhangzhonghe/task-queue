const useStorage = <T>(key: string) => {
  const unparsed = wx.getStorageSync(key)
  let value: T | null = unparsed && JSON.parse(unparsed)

  const setValue = (v: T) => {
    wx.setStorageSync(key, JSON.stringify(v))
    value = v
  }
  return [() => value, setValue] as [() => T, (v: T) => void]
}

export default useStorage
