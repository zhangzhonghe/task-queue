import { PageWithSetup } from 'miniprogram-setup'
import useBasic from '../../model/useBasic'

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
    } = useBasic<string>()

    const handleAddTask = () => {
      addTask(inputValue)
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
