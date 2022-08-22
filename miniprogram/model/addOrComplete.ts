import { onDetached } from 'miniprogram-setup'
import useQueue from '../hooks/useQueue'
import useStorage from '../hooks/useStorage'

interface Task {
  title: string
}

const setup = () => {
  let isInputVisible = false
  const [getStorage, setStorage] = useStorage<Task[]>('TASK_QUEUE')
  const { enqueue, dequeue, getFirst, getQueue } = useQueue<Task>(getStorage())
  const showInput = () => isInputVisible = true
  const add = (task: Task) => {
    enqueue(task)
    isInputVisible = false
  }
  const complete = () => {
    dequeue()
  }

  onDetached(() => setStorage(getQueue()))

  return () => ({
    isInputVisible,
    showInput,
    add,
    complete,
    currentTask: getFirst(),
  })
}

export default setup
