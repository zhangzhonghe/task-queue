import { PageWithSetup } from 'miniprogram-setup'
import useBasic from '../../model/basic'
import { createTask } from '../../model/task'

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

    return () => {
      return {
        isInputVisible: isInputVisible(),
        showInput: handleShowInput,
        hideInput,
        addTask: handleAddTask,
        completeTask,
        currentTask: getCurrentTask(),
        inputValue,
        handleInput,
      }
    }
  },
})
