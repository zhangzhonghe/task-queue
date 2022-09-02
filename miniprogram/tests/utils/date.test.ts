import { describe, expect, test } from 'vitest'
import { msToString } from '../../utils'

describe('date', () => {
  test('ms to string', () => {
    expect(msToString(0)).toBe('')
    expect(msToString(1000)).toBe('1 秒')
    expect(msToString(10000)).toBe('10 秒')
    expect(msToString(60000)).toBe('1 分钟')
    expect(msToString(600000)).toBe('10 分钟')
    expect(msToString(3600000)).toBe('1 小时')
    expect(msToString(36000000)).toBe('10 小时')
    expect(msToString(360610000)).toBe('100 小时 10 分钟 10 秒')
  })
})
