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