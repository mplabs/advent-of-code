
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'

export default class Day2 extends AbstractPuzzle {
    get input() {
        return this.rawInput
            .split(',')
            .map(range => range.split('-')
                .map(input => Number(input)) as [number, number])
    }

    public solveFirst(): unknown {
        const regExp = /^(.+?)\1$/

        let result = 0
        this.input.forEach(([lo, hi]) => {
            for (let current of range(lo, hi + 1)) {
                if (regExp.test(String(current))) {
                    result += current
                }
            }
        })
        return result
    }

    public solveSecond(): unknown {
        const regExp = /^(.+?)\1+$/

        let result = 0
        this.input.forEach(([lo, hi]) => {
            for (let current of range(lo, hi + 1)) {
                if (regExp.test(String(current))) {
                    result += current
                }
            }
        })
        return result
    }
}
