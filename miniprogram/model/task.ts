import { showToast } from '../wxApiProxy'
import type { TaskData } from './basic'

export function createTask(text: string): TaskData {
  return {
    text,
    createdAt: getCurrentDate(),
    completedAt: '',
    activityTimePeriod: [],
  }
}

export function start(task: TaskData) {
  if (isActive(task)) {
    console.warn('任务正在进行中')
    return
  }
  task.activityTimePeriod.push(getCurrentDate())
}

export function pause(task: TaskData) {
  if (!isActive(task)) {
    console.warn('任务未开始')
    return
  }
  task.activityTimePeriod.push(getCurrentDate())
}

export function complete(task: TaskData) {
  if (task.activityTimePeriod.length === 0)
    return showToast('任务从未开始过')

  if (isActive(task)) {
    pause(task)
    task.completedAt
      = task.activityTimePeriod[task.activityTimePeriod.length - 1]
  }
  else {
    task.completedAt = getCurrentDate()
  }
}

export function getDuration(task: TaskData): number {
  if (task.activityTimePeriod.length === 0)
    return 0

  let result = 0
  for (let i = 0; i < task.activityTimePeriod.length; i += 2) {
    const start = new Date(task.activityTimePeriod[i])
    const end = new Date(task.activityTimePeriod[i + 1] || getCurrentDate())
    result += end.getTime() - start.getTime()
  }
  return result
}

export function isActive(task: TaskData) {
  return task.activityTimePeriod.length % 2 === 1
}

function getCurrentDate() {
  return new Date().toISOString()
}
