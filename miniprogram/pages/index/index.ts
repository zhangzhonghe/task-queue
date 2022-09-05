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

    const { getDuration, toggleTimer } = useDuration(getCurrentTask)

    const handleDoubleClick = doubleClick(() => {
      const task = getCurrentTask()
      if (!task)
        return

      startOrPause(task)
      toggleTimer()
    })

    function startOrPause(task: TaskData) {
      if (isActive(task))
        pause(task)
      else start(task)
    }

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
  let timer: any

  const toggleTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    else {
      // #2
      result = result || '0 秒'
      timer = setInterval(() => {
        result = getDurationString(getTask())
      }, 1000)
    }
  }

  onPageUnload(() => {
    timer && clearInterval(timer)
  })

  return {
    getDuration: () => result,
    toggleTimer,
  }
}

function getDurationString(task: TaskData | null) {
  if (!task)
    return ''
  return msToString(getDuration(task))
}
