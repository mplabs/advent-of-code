import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached, memoize } from '@utils/utils'

export default class Day11 extends AbstractPuzzle {
    @Cached()
    get input() {
        return this.rawInput.split(' ').map((n) => parseInt(n))
    }

    public solveFirst(): unknown {
        console.time(`Part 1`)
        const result = this.input.reduce((acc, value) => (acc += count(value, 25)), 0)
        console.timeEnd(`Part 1`)

        return result
    }

    public solveSecond(): unknown {
        console.time(`Part 2`)
        const result = this.input.reduce((acc, value) => (acc += count(value, 75)), 0)
        console.timeEnd(`Part 2`)

        return result
    }
}
const count = memoize((stone: number, iterations: number): number => {
    // If no more iterations are left, we have one stone
    if (iterations === 0) {
        return 1
    }
    
    // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1
    if (stone === 0) {
        return count(1, iterations - 1)
    }

    // If number of  digits is not even, multiply by 2024
    const numOfDigits = Math.floor(Math.log10(stone)) + 1
    if (numOfDigits % 2 !== 0) {
        return count(stone * 2024, iterations - 1)
    }

    // Otherwise we make two new stones
    const halfLength = Math.floor(numOfDigits / 2)
    const divisor = 10 ** halfLength
    return count(Math.floor(stone / divisor), iterations - 1) + count(stone % divisor, iterations - 1)
})
