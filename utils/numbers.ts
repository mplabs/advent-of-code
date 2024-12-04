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

/**
 * Calculates the factorial of a number using memoization for optimization.
 *
 * Factorial is defined as:
 * - `n! = n * (n-1) * (n-2) * ... * 1`, with `0! = 1`.
 *
 * @function
 * @param {number} n - The number for which the factorial is to be calculated. Must be a non-negative integer.
 * @returns {number} - The factorial of the given number.
 * @throws {Error} - Throws an error if the input is a negative number.
 *
 * @example
 * factorial(5); // Returns 120
 * factorial(6); // Returns 720
 * factorial(0); // Returns 1
 */
export const factorial = (function () {
    const cache: Record<number, number> = {}
    return function factorial(n: number): number {
        if (n < 0) {
            throw new Error('Factorial is not defined for negative numbers')
        }
        if (n === 0 || n === 1) {
            return 1
        }
        if (cache[n]) {
            return cache[n]
        }
        cache[n] = n * factorial(n - 1)
        return cache[n]
    }
})()
