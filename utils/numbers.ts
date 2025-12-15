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


/**
 * Form a number from its digits
 * 
 * @function
 * @param {number[]} digits - the digits that form the number
 * @returns number - the result
 * 
 * @example
 * numberFromDigits([1,2,3]); // Returns 123
 */
export function numberFromDigits(digits: number | number[], ...rest: number[]): number {
    digits = Array.isArray(digits) ? digits : [digits, ...rest]

    let result = 0, factorial = 1
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] > 9 || digits[i] < 0) {
            throw Error(`Digit must be between 0 and 9, got ${digits[i]}`)
        }

        result += factorial * digits[i]
        factorial *= 10
    }

    return result
}

/**
 * Computes the arithmetic sum of the provided numeric arguments.
 *
 * @param {...number} numbers - One or more numbers to be added together.
 * @returns {number} The sum of all provided numbers. Returns 0 if no arguments are supplied.
 */
export function sum(...numbers: number[]): number {
    return numbers.reduce((acc, cur) => acc + cur, 0)
}
