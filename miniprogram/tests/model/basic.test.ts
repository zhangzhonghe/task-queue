import { describe, expect, it } from 'vitest'
import useBasic from '../../model/basic'
import { createTask } from '../../model/task'

describe('Add or complete task', () => {
  const task = createTask('任务详情')

  it('Add a task', () => {
    const { isInputVisible, getCurrentTask, showInput, addTask, completeTask }
      = useBasic()

    expect(isInputVisible()).toBe(false)
    expect(getCurrentTask()).toBe(null)

    showInput()
    expect(isInputVisible()).toBe(true)

    addTask(task)
    expect(isInputVisible()).toBe(false)
    expect(getCurrentTask()).toEqual(task)
    expect(getCurrentTask()?.isActive).toEqual(false)

    completeTask()
    expect(isInputVisible()).toBe(false)
    expect(getCurrentTask()).toBe(null)

    expect(() => addTask({ ...task, text: '' })).toThrowError('任务不能为空')
  })

  it('Control input box display', () => {
    const { isInputVisible, showInput, hideInput } = useBasic()

    expect(isInputVisible()).toBe(false)

    showInput()
    expect(isInputVisible()).toBe(true)

    hideInput()
    expect(isInputVisible()).toBe(false)
  })
})
