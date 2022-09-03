import { describe, expect, it } from 'vitest'
import useBasic from '../../model/basic'
import { createTask, isActive, start } from '../../model/task'

declare function onAppHide(): void

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
    expect(isActive(getCurrentTask()!)).toEqual(false)

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

  it('get task from storage', () => {
    const { getCurrentTask, addTask } = useBasic()
    const task = JSON.parse(JSON.stringify(createTask('任务详情')))
    addTask(task)
    expect(getCurrentTask()).toEqual(task)
    expect(isActive(getCurrentTask()!)).toBe(false)
    start(getCurrentTask()!)
    expect(isActive(getCurrentTask()!)).toBe(true)

    // 模拟小程序生命周期
    onAppHide()

    const { getCurrentTask: getCurrentTask2 } = useBasic()
    expect(getCurrentTask2()).toEqual(task)
    expect(isActive(getCurrentTask2()!)).toBe(true)
  })
})
