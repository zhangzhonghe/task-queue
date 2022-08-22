import { describe, expect, it } from 'vitest'
import setup from '../../model/addOrComplete'

describe('Add or complete task', () => {
  it('Add a task', () => {
    interface ReturnData {
      isInputVisible: boolean
      showInput: () => any
      add: (task: any) => any
      complete: () => any
      currentTask: any
    }
    const getData: () => ReturnData = setup()

    expect(getData().isInputVisible).toBe(false)
    expect(getData().currentTask).toBe(null)

    getData().showInput()
    expect(getData().isInputVisible).toBe(true)

    getData().add('任务1')
    expect(getData().isInputVisible).toBe(false)
    expect(getData().currentTask).toBe('任务1')

    getData().complete()
    expect(getData().isInputVisible).toBe(false)
    expect(getData().currentTask).toBe(null)
  })
})
