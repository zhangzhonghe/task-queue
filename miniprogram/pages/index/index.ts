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
    const { getDuration, toggleTimer } = useDuration(getCurrentTask)

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
      toggleTimer(false)
    }

    const handleDoubleClick = doubleClick(() => {
      const task = getCurrentTask()
      if (!task)
        return

      startOrPause(task)
    })

    function startOrPause(task: TaskData) {
      if (isActive(task)) {
        pause(task)
        toggleTimer(false)
      }
      else {
        start(task)
        toggleTimer(true)
      }
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
  const task = getTask()
  let result = getDurationString(task)
  let timer: any

  const toggleTimer = (isStart: boolean) => {
    if (!isStart) {
      timer && clearInterval(timer)
      timer = null
      result = getDurationString(getTask())
    }
    else {
      // #2
      result = result || '0 秒'
      timer = setInterval(() => {
        result = getDurationString(getTask())
      }, 1000)
    }
  }

  if (task && isActive(task))
    toggleTimer(true)

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
