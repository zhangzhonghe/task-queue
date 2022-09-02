export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(':')}`
}

function formatNumber(n: number) {
  const s = n.toString()
  return s[1] ? s : `0${s}`
}

export const isString = (value: any) => typeof value === 'string'
export const isArray = (value: any) => Array.isArray(value)

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
