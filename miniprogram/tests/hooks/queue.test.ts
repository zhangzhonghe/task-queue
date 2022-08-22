import { describe, expect, it } from 'vitest'
import useQueue from '../../hooks/useQueue'

describe('Queue', () => {
  it('Basic', () => {
    const { dequeue, enqueue, getSize, getFirst } = useQueue<string>()

    expect(getSize()).toBe(0)
    expect(getFirst()).toBe(null)
    expect(dequeue()).toBe(null)

    // 入队
    enqueue('入队')
    expect(getSize()).toBe(1)
    expect(getFirst()).toBe('入队')

    // 出队
    dequeue()
    expect(getSize()).toBe(0)
    expect(getFirst()).toBe(null)
  })
})
