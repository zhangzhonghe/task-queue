import { describe, expect, test, vi } from 'vitest'
import { sleep } from '../../utils'
import { doubleClick } from '../../utils/doubleClick'

describe('doubleClick', () => {
  test('generate double click event handler', () => {
    const realHandler = vi.fn()
    const handler = doubleClick(realHandler)
    handler({ timeStamp: 0 } as any)
    handler({ timeStamp: 100 } as any)
    expect(realHandler).toBeCalledTimes(1)
  })

  // https://github.com/zhangzhonghe/task-queue/issues/1
  test('click first and then double click', async () => {
    const realHandler = vi.fn()
    const handler = doubleClick(realHandler)
    handler({ timeStamp: 0 } as any)
    await sleep(300)
    // Need to wait at least 300ms
    handler({ timeStamp: 400 } as any)
    handler({ timeStamp: 500 } as any)
    expect(realHandler).toBeCalledTimes(1)
  })
})
