import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'
import { transpose } from '@utils/matrix'

export default class Day4 extends AbstractPuzzle {
    get input() {
        return this.rawInput.split('\n').map((line) => line.split(''))
    }

    public solveFirst(): number {
        let result = 0
        for (let y of range(0, this.input.length)) {
            for (let x of range(0, this.input[0].length)) {
                result += this.findXmas(x, y)
            }
        }

        return result
    }

    public solveSecond(): unknown {
        let result = 0
        for (let y of range(1, this.input.length - 1)) {
            for (let x of range(1, this.input[0].length - 1)) {
                result += this.findCrossMas(x, y)
            }
        }

        return result
    }

    private findCrossMas(x: number, y: number): number {
        // Check current char is an A
        if (this.input[y][x] !== 'A') {
            return 0
        }

        let result = 0

        /**
         * ## Variation 0
         * M S
         *  A
         * M S
         */
        if (
            this.input[y - 1][x - 1] === 'M' &&
            this.input[y - 1][x + 1] === 'S' &&
            this.input[y + 1][x - 1] === 'M' &&
            this.input[y + 1][x + 1] === 'S'
        ) {
            result++
        }

        /**
         * ## Variation 1
         * S M
         *  A
         * S M
         */
        if (
            this.input[y - 1][x - 1] === 'S' &&
            this.input[y - 1][x + 1] === 'M' &&
            this.input[y + 1][x - 1] === 'S' &&
            this.input[y + 1][x + 1] === 'M'
        ) {
            result++
        }

        /**
         * ## Variation 2
         * S S
         *  A
         * M M
         */
        if (
            this.input[y - 1][x - 1] === 'S' &&
            this.input[y - 1][x + 1] === 'S' &&
            this.input[y + 1][x - 1] === 'M' &&
            this.input[y + 1][x + 1] === 'M'
        ) {
            result++
        }

        /**
         * ## Variation 3
         * M M
         *  A
         * S S
         */
        if (
            this.input[y - 1][x - 1] === 'M' &&
            this.input[y - 1][x + 1] === 'M' &&
            this.input[y + 1][x - 1] === 'S' &&
            this.input[y + 1][x + 1] === 'S'
        ) {
            result++
        }

        return result
    }

    private findXmas(x: number, y: number): number {
        // Check current char is an X
        if (this.input[y][x] !== 'X') {
            return 0
        }

        let result = 0

        // Check East
        if (this.input[y] && this.input[y][x + 3]) {
            if (
                this.input[y][x + 1] === 'M' &&
                this.input[y][x + 2] === 'A' &&
                this.input[y][x + 3] === 'S'
            ) {
                result++
            }
        }

        // Check South-East
        if (this.input[y + 3] && this.input[y + 3][x + 3]) {
            if (
                this.input[y + 1][x + 1] === 'M' &&
                this.input[y + 2][x + 2] === 'A' &&
                this.input[y + 3][x + 3] === 'S'
            ) {
                result++
            }
        }

        // Check South
        if (this.input[y + 3] && this.input[y + 3][x]) {
            if (
                this.input[y + 1][x] === 'M' &&
                this.input[y + 2][x] === 'A' &&
                this.input[y + 3][x] === 'S'
            ) {
                result++
            }
        }

        // Check South-West
        if (this.input[y + 3] && this.input[y + 3][x - 3]) {
            if (
                this.input[y + 1][x - 1] === 'M' &&
                this.input[y + 2][x - 2] === 'A' &&
                this.input[y + 3][x - 3] === 'S'
            ) {
                result++
            }
        }

        // Check West
        if (this.input[y] && this.input[y][x - 3]) {
            if (
                this.input[y][x - 1] === 'M' &&
                this.input[y][x - 2] === 'A' &&
                this.input[y][x - 3] === 'S'
            ) {
                result++
            }
        }

        // Check North-West
        if (this.input[y - 3] && this.input[y - 3][x - 3]) {
            if (
                this.input[y - 1][x - 1] === 'M' &&
                this.input[y - 2][x - 2] === 'A' &&
                this.input[y - 3][x - 3] === 'S'
            ) {
                result++
            }
        }

        // Check North
        if (this.input[y - 3] && this.input[y - 3][x]) {
            if (
                this.input[y - 1][x] === 'M' &&
                this.input[y - 2][x] === 'A' &&
                this.input[y - 3][x] === 'S'
            ) {
                result++
            }
        }

        // Check North-East
        if (this.input[y - 3] && this.input[y - 3][x + 3]) {
            if (
                this.input[y - 1][x + 1] === 'M' &&
                this.input[y - 2][x + 2] === 'A' &&
                this.input[y - 3][x + 3] === 'S'
            ) {
                result++
            }
        }

        return result
    }
}
