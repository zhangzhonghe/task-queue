import { describe, expect, it } from 'vitest'
import useBasic from '../../model/useBasic'

describe('Add or complete task', () => {
  it('Add a task', () => {
    const { isInputVisible, getCurrentTask, showInput, addTask, completeTask }
      = useBasic<string>()

    expect(isInputVisible()).toBe(false)
    expect(getCurrentTask()).toBe(null)

    showInput()
    expect(isInputVisible()).toBe(true)

    addTask('任务1')
    expect(isInputVisible()).toBe(false)
    expect(getCurrentTask()).toBe('任务1')

    completeTask()
    expect(isInputVisible()).toBe(false)
    expect(getCurrentTask()).toBe(null)

    expect(() => addTask('')).toThrowError('任务不能为空')
  })

  it('Control input box display', () => {
    const { isInputVisible, showInput, hideInput } = useBasic<string>()

    expect(isInputVisible()).toBe(false)

    showInput()
    expect(isInputVisible()).toBe(true)

    hideInput()
    expect(isInputVisible()).toBe(false)
  })
})
