export function msToString(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60) % 60
  const hours = Math.floor(totalSeconds / 3600)
  return `${hours ? `${hours} 小时 ` : ''}${minutes ? `${minutes} 分钟 ` : ''}${
    seconds ? `${seconds} 秒` : ''
  }`.trim()
}
