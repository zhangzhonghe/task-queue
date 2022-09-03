import { PageWithSetup, onPageUnload } from 'miniprogram-setup'
import type { TaskData } from '../../model/basic'
import useBasic from '../../model/basic'
import {
  complete,
  createTask,
  getDuration,
  isActive,
  pause,
  start,
} from '../../model/task'
import { doubleClick } from '../../utils/doubleClick'
import { msToString } from '../../utils/index'

PageWithSetup({
  setup() {
    let inputValue = ''
    const {
      isInputVisible,
      showInput,
      hideInput,
      addTask,
      completeTask,
      getCurrentTask,
    } = useBasic()

    const handleAddTask = () => {
      addTask(createTask(inputValue))
    }
    const handleInput = (e: WechatMiniprogram.TextareaInput) => {
      inputValue = e.detail.value
    }
    const handleShowInput = () => {
      inputValue = ''
      showInput()
    }
    const handleStart = () => {}
    const handlePause = () => {}
    const handleComplete = () => {
      complete(getCurrentTask()!)
      completeTask()
    }

    const handleDoubleClick = doubleClick(() => {
      const task = getCurrentTask()
      if (!task)
        return

      startOrPause(task)
    })

    function startOrPause(task: TaskData) {
      if (isActive(task))
        pause(task)
      else start(task)
    }

    const getDuration = useDuration(getCurrentTask)

    return () => {
      return {
        isInputVisible: isInputVisible(),
        showInput: handleShowInput,
        hideInput,
        addTask: handleAddTask,
        completeTask: handleComplete,
        currentTask: getCurrentTask(),
        isActive: getCurrentTask() ? isActive(getCurrentTask()!) : false,
        inputValue,
        handleInput,
        duration: getDuration(),
        handleStart,
        handlePause,
        handleDoubleClick,
      }
    }
  },
})

function useDuration(getTask: () => TaskData | null) {
  let result = ''
  const timer = setInterval(() => {
    result = getDurationString(getTask())
  }, 1000)

  onPageUnload(() => {
    clearInterval(timer)
  })

  return () => result
}

function getDurationString(task: TaskData | null) {
  if (!task)
    return ''
  return msToString(getDuration(task))
}
