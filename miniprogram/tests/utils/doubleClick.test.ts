import { describe, expect, test, vi } from 'vitest'
import { doubleClick } from '../../utils/doubleClick'

describe('doubleClick', () => {
  test('generate double click event handler', () => {
    const realHandler = vi.fn()
    const handler = doubleClick(realHandler)
    handler({ timeStamp: 0 } as any)
    handler({ timeStamp: 100 } as any)
    expect(realHandler).toBeCalledTimes(1)
  })
})
