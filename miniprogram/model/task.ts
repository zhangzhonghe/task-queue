import { showToast } from '../wxApiProxy'
import type { TaskData } from './basic'

export function createTask(text: string): TaskData {
  return {
    text,
    createdAt: getCurrentDate(),
    completedAt: '',
    activityTimePeriod: [],
    get isActive() {
      return this.activityTimePeriod.length % 2 === 1
    },
  }
}

export function start(task: TaskData) {
  if (task.isActive) {
    console.warn('任务正在进行中')
    return
  }
  task.activityTimePeriod.push(getCurrentDate())
}

export function pause(task: TaskData) {
  if (!task.isActive) {
    console.warn('任务未开始')
    return
  }
  task.activityTimePeriod.push(getCurrentDate())
}

export function complete(task: TaskData) {
  if (task.activityTimePeriod.length === 0)
    return showToast('任务从未开始过')

  if (task.isActive) {
    pause(task)
    task.completedAt
      = task.activityTimePeriod[task.activityTimePeriod.length - 1]
  }
  else {
    task.completedAt = getCurrentDate()
  }
}

function getCurrentDate() {
  return new Date().toISOString()
}
