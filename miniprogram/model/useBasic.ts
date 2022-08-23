import useQueue from '../hooks/useQueue'
import useStorage from '../hooks/useStorage'
import { showToast } from '../wxApiProxy/index'

const useBasic = <T>() => {
  let isInputVisible = false
  const [getStorage, setStorage] = useStorage<T[]>('TASK_QUEUE')
  const { enqueue, dequeue, getFirst, getQueue } = useQueue<T>(getStorage())
  const showInput = () => (isInputVisible = true)
  const hideInput = () => (isInputVisible = false)
  const addTask = (task: T) => {
    if (!task)
      return showToast('任务不能为空')
    enqueue(task)
    setStorage(getQueue())
    isInputVisible = false
  }
  const completeTask = () => {
    dequeue()
    setStorage(getQueue())
  }

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
