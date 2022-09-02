import { describe, expect, test } from 'vitest'
import { complete, createTask, pause, start } from '../../model/task'
import { isArray, isString, sleep } from '../../utils/util'

describe('task', () => {
  test('create a task', () => {
    const task = createTask('任务详情')

    expect(isString(task.text)).toBe(true)
    expect(isString(task.createdAt)).toBe(true)
    expect(isString(task.completedAt)).toBe(true)
    expect(isArray(task.activityTimePeriod)).toBe(true)
    expect(task.isActive).toBe(false)
  })

  test('start or pause a task', () => {
    const task = createTask('任务详情')

    expect(task.isActive).toBe(false)

    start(task)
    expect(task.isActive).toBe(true)
    expect(task.activityTimePeriod.length).toBe(1)
    // 进行中的任务再次开启无效
    start(task)
    expect(task.isActive).toBe(true)
    expect(task.activityTimePeriod.length).toBe(1)

    pause(task)
    expect(task.isActive).toBe(false)
    expect(task.activityTimePeriod.length).toBe(2)
    // 已暂停的任务再次暂停无效
    pause(task)
    expect(task.isActive).toBe(false)
    expect(task.activityTimePeriod.length).toBe(2)
  })

  test('complete a task', async () => {
    const task = createTask('任务详情')

    expect(() => complete(task)).toThrowError('任务从未开始过')
    start(task)
    await sleep(1000)
    complete(task)
    expect(task.isActive).toBe(false)
    expect(task.completedAt).toBeTruthy()
    expect(task.activityTimePeriod.length).toBe(2)
    expect(
      task.activityTimePeriod[task.activityTimePeriod.length - 1]
        === task.completedAt,
    ).toBe(true)
  })

  test('can not to change activity time period when task is completed after task is paused', async () => {
    const task = createTask('任务详情')

    start(task)
    await sleep(1000)
    pause(task)
    expect(task.activityTimePeriod.length).toBe(2)

    await sleep(1000)
    complete(task)
    expect(task.completedAt).toBeTruthy()
    expect(task.activityTimePeriod.length).toBe(2)
    expect(
      task.activityTimePeriod[task.activityTimePeriod.length - 1]
        === task.completedAt,
    ).toBe(false)
  })
})
