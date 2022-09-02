import { describe, expect, test } from 'vitest'
import createTask from '../../model/task'
import { isArray, isString } from '../../utils/util'

describe('createTask', () => {
  test('create a task', () => {
    const task = createTask('任务详情')

    expect(isString(task.text)).toBe(true)
    expect(isString(task.createdAt)).toBe(true)
    expect(isString(task.completedAt)).toBe(true)
    expect(isArray(task.activityTimePeriod)).toBe(true)
    expect(task.isActive).toBe(false)
  })
})
