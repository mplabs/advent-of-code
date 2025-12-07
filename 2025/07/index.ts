import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached, Memoized } from '@utils/utils'

export default class Day7 extends AbstractPuzzle {
    get input() {
        return this.rawInput.split('\n')
    }

    @Cached()
    get cols() {
        return this.rawInput.split('\n')[0].length
    }

    @Cached()
    get grid() {
        return this.rawInput.split('\n').map(line => line.split(''))
    }

    @Cached()
    get rows() {
        return this.rawInput.split('\n').length
    }

    public solveFirst(): unknown {
        let result = 0
        const input = [...this.input]
        const beams = new Set<number>()
        beams.add(input.shift()!.indexOf('S'))

        for (let line of input) {
            Array.from(line.matchAll(/\^/g))
                .map(({ index }) => index)
                .forEach(splitter => {
                    if (beams.has(splitter)) {
                        result++
                        beams.delete(splitter)
                        beams.add(splitter - 1)
                        beams.add(splitter + 1)
                    }
                })
        }

        return result
    }

    public solveSecond(): unknown {
        const input = [...this.input]
        return this.waysFrom(1, input.shift()!.indexOf('S'))
    }

    @Memoized()
    private waysFrom(r: number, c: number): number {
        // Check if we run out of the diagram
        if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) {
            return 1
        }

        const cell = this.grid[r][c]
        let result: number

        switch(cell) {
            case '.':
                result = this.waysFrom(r + 1, c)
                break
            
            case '^':
                result = this.waysFrom(r, c - 1) + this.waysFrom(r, c + 1)
                break

            default:
                result = 0
                break
        }

        return result
    }
}
