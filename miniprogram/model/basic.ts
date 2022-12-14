import useQueue from '../hooks/useQueue'
import useStorage from '../hooks/useStorage'
import { showToast } from '../wxApiProxy'

export interface TaskData {
  /** 文本内容 */
  text: string
  /** 任务创建的时间 */
  createdAt: string
  /** 任务完成的时间 */
  completedAt: string
  /** 任务进行中的时间段 */
  activityTimePeriod: string[]
}

const useBasic = () => {
  let isInputVisible = false
  const [getStorage, setStorage] = useStorage<TaskData[]>('TASK_QUEUE')
  const { enqueue, dequeue, getFirst, getQueue } = useQueue<TaskData>(
    getStorage(),
  )
  const showInput = () => (isInputVisible = true)
  const hideInput = () => (isInputVisible = false)
  const addTask = (task: TaskData) => {
    if (!task.text)
      return showToast('任务不能为空')
    enqueue(task)
    setStorage(getQueue())
    isInputVisible = false
  }
  const completeTask = () => {
    dequeue()
    setStorage(getQueue())
  }

  wx.onAppHide(() => {
    setStorage(getQueue())
  })

  return {
    isInputVisible: () => isInputVisible,
    showInput,
    hideInput,
    addTask,
    completeTask,
    getCurrentTask: getFirst,
  }
}

export default useBasic
