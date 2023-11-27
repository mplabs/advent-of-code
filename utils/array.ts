export function chunk<T>(input: T[], chunkSize = 1): T[][] {
  const arr = [...input]
  const chunkedArray: T[][] = []

  while (arr.length > 0) {
    chunkedArray.push(arr.splice(0, chunkSize))
  }

  return chunkedArray
}

export function intersection<T>(arr: T[], ...args: T[][]): T[] {
  return arr.filter(item => args.every(arr => arr.includes(item)))
}
