const useQueue = <T>(defaultQueue?: T[]) => {
  const queue: T[] = defaultQueue || []

  const enqueue = (v: T) => {
    queue.push(v)
  }
  const dequeue = () => queue.shift() || null
  const getFirst = () => queue[0] || null

  return {
    getSize: () => queue.length,
    enqueue,
    dequeue,
    getFirst,
    getQueue: () => queue,
  }
}

export default useQueue
