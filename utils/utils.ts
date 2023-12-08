export const manhattenDistance = (
  [x1, y1]: [x: number, y: number],
  [x2, y2]: [x: number, y: number]
): number => Math.abs(x1 - x2) + Math.abs(y2 - y2)

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)

    if (!cache.has(key)) {
      cache.set(key, fn(...args))
    }

    return cache.get(key)!
  }) as T
}
