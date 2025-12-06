
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { transpose } from '@utils/matrix'

export default class Day6 extends AbstractPuzzle {
    get input() {
        const matrix = this.rawInput
            .trim()
            .split('\n')
            .map(line => line.match(/\S+/g)!)

        return transpose(matrix)
    }

    public solveFirst(): unknown {
        let total = 0

        for (const problem of this.input) {
            let result = 0
            const operator = problem.pop()
            const numbers = problem.map(Number)
            switch (operator) {
                case '+':
                    result = numbers.reduce((acc, curr) => acc + curr, 0)
                    break

                case '*':
                    result = numbers.reduce((acc, curr) => acc * curr, 1)
                    break

                default:
                    throw new Error(`Invalid operator: ${operator}.`)
            }

            total += result
        }

        return total
    }

    public solveSecond(): unknown {
        let total = 0

        const lines = this.rawInput.trim().split('\n')
        const height = lines.length
        const width = lines[0].length

        // Get column operators
        const operators: { column: number, operator: string }[] = []
        for (let column = 0; column < width; column++) {
            const op = lines[lines.length - 1][column]
            if (op === '+' || op === '*') {
                operators.push({ column, operator: lines[lines.length - 1][column] })
            }
        }

        // Get problems
        operators.forEach(({ column: startColumn, operator }, i) => {
            const endColumn = (i + 1 < operators.length)
                ? operators[i + 1].column - 1
                : width - 1
            
            const numbers = []
            for (let columnIdx = endColumn; columnIdx >= startColumn; columnIdx--) {
                let digits = ''

                for (let row = 0; row < height - 1; row++) {
                    const ch = lines[row][columnIdx];
                    if (ch !== " ") {
                        digits += ch
                    }
                }
                if (digits) {
                    numbers.push(Number(digits))
                }
            }

            const result = numbers.reduce(
                (acc, cur) => (operator === "+" ? acc + cur : acc * cur),
                operator === "+" ? 0 : 1
            );

            total += result
        })


        return total
    }
}
