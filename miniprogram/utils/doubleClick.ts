export function doubleClick(
  realHandler: ((e: WechatMiniprogram.CustomEvent) => any) & {
    lastTimeStamp?: number
  },
) {
  return (e: WechatMiniprogram.CustomEvent) => {
    if (realHandler.lastTimeStamp === undefined) {
      realHandler.lastTimeStamp = e.timeStamp
      return
    }
    if (e.timeStamp - realHandler.lastTimeStamp < 300)
      realHandler(e)

    realHandler.lastTimeStamp = undefined
  }
}
