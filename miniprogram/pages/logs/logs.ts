// logs.ts
// const util = require('../../utils/util.js')
import { PageWithSetup } from 'miniprogram-setup'
import { formatTime } from '../../utils/util'

PageWithSetup({
  data: {
    logs: [],
  },
  setup() {
    const logs = (wx.getStorageSync('logs') || []).map((log: string) => {
      return {
        date: formatTime(new Date(log)),
        timeStamp: log,
      }
    })

    return () => ({
      logs,
    })
  },
})
