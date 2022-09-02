import type { TaskData } from './basic'

export default function createTask(text: string): TaskData {
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

function getCurrentDate() {
  return new Date().toISOString()
}
