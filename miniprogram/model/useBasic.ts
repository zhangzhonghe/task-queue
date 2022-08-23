import { onDetached } from 'miniprogram-setup'
import useQueue from '../hooks/useQueue'
import useStorage from '../hooks/useStorage'

const useBasic = <T>() => {
  let isInputVisible = false
  const [getStorage, setStorage] = useStorage<T[]>('TASK_QUEUE')
  const { enqueue, dequeue, getFirst, getQueue } = useQueue<T>(getStorage())
  const showInput = () => (isInputVisible = true)
  const addTask = (task: T) => {
    enqueue(task)
    isInputVisible = false
  }
  const completeTask = () => {
    dequeue()
  }

  onDetached(() => setStorage(getQueue()))

  return {
    isInputVisible: () => isInputVisible,
    showInput,
    addTask,
    completeTask,
    getCurrentTask: getFirst,
  }
}

export default useBasic
