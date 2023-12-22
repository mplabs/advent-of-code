/**
 * Determine if a number is within a given range
 * @param num Number to check
 * @param a lower bound
 * @param b upper bound
 * @returns
 */
export function inRange(num: number, a: number, b: number): boolean {
  return Math.min(a, b) <= num && num < Math.max(a, b)
}

export function hex2dec(hex: string): number {
  return parseInt(hex, 16)
}

export function wrap(index: number, lowerBound: number, upperBound: number): number {
  if (lowerBound > upperBound) {
    throw new Error('Lower bound cannot be greater than upper bound')
  }

  const rangeSize = upperBound - lowerBound + 1

  if (index < lowerBound) {
    return upperBound - ((lowerBound - index - 1) % rangeSize)
  } else {
    return lowerBound + ((index - lowerBound) % rangeSize)
  }
}
