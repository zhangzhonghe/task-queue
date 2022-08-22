import { describe, expect, it } from 'vitest'
import useStorage from '../../hooks/useStorage'

describe('Storage', () => {
  it('Basic', () => {
    const [getValue, setValue] = useStorage<number>('TEST')

    expect(getValue()).toBe(null)

    setValue(1)
    expect(getValue()).toBe(1)
  })
})
