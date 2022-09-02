export { msToString } from './date'

export const isString = (value: any) => typeof value === 'string'
export const isArray = (value: any) => Array.isArray(value)

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
