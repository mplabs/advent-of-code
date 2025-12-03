import AbstractPuzzle from '@utils/AbstractPuzzle'
import { numberFromDigits } from '@utils/numbers'


export default class Day3 extends AbstractPuzzle {
    get input() {
        return this.rawInput
            .split('\n')
            .map((line) => line.split('')
                .map((digit) => Number(digit)))
    }

    public solveFirst(): unknown {
        let result = 0
        for (let bank of this.input) {
            let max = 0
            for (let i = 0; i < bank.length - 1; i++) {
                for (let j = i + 1; j < bank.length ; j++) {
                    let pair = bank[i] * 10 + bank[j]
                    if (pair > max) {
                        max = pair
                    }
                }
            }

            result += max
        }

        return result
    }

    public solveSecond(): unknown {
        let result = 0

        this.input.forEach(bank => {
            let max = 0
            
        })

        return null
    }
}
