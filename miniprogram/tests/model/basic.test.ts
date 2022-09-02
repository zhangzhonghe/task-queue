import { describe, expect, it } from 'vitest'
import useBasic from '../../model/basic'

describe('Add or complete task', () => {
  const task = {
    text: '任务详情',
    createdAt: '2020-01-01',
    completedAt: '2020-01-01',
    activityTimePeriod: [],
    get isActive() {
      return this.activityTimePeriod.length % 2 === 1
    },
  }

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
