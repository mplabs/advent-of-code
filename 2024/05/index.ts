import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day5 extends AbstractPuzzle {
    @Cached()
    get input() {
        return {
            rules: this.rawInput
                .split('\n\n')[0]
                .split('\n')
                .map((line) => line.split('|'))
                .map(i => i.map(Number)) as [number, number][],
            updates: this.rawInput
                .split('\n\n')[1]
                .split('\n')
                .map((line) => line.split(','))
                .map(i => i.map(Number)),
        }
    }

    get rules() {
        return this.input.rules
    }

    get updates() {
        return this.input.updates
    }

    public solveFirst(): unknown {
        const lines: number[][] = []
        for (const numbers of this.updates) {
            if (this.rules.every(rule => this.logic(rule, numbers)[0])) {
                lines.push(numbers)
            }
        }

        return this.sumMiddle(lines)
    }

    public solveSecond(): unknown {
        const lines: number[][] = []
        for (const numbers of this.updates) {
            if (this.rules.every(rule => this.logic(rule, numbers)[0])) {
                lines.push(numbers)
            }
        }
        
        const unordered = this.updates.filter(u => !lines.includes(u))

        let done = false
        while(!done) {
            done = true
            for (const numbers of unordered) {
                this.rules.some(rule => {
                    const [value, index1, index2] = this.logic(rule, numbers)
                    if (!value) {
                        [numbers[index1], numbers[index2]] = [numbers[index2], numbers[index1]]
                        done = false
                    }
                })
            }
        }

        return this.sumMiddle(unordered)

    }

    private logic(rule: [number, number], numbers: number[]): [boolean, number, number] {
        const [index1, index2] = [numbers.indexOf(rule[0]), numbers.indexOf(rule[1])]
        return (index1 !== -1 && index2 !== -1 && index1 > index2)
            ? [false, index1, index2]
            : [true, index1, index2]
    }

    private sumMiddle(arr: number[][]): number {
        return arr.reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0)
    }
}
