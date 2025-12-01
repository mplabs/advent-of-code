import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day1 extends AbstractPuzzle {
    get input(): number[] {
        return this.rawInput
            .split('\n')
            .map((line) => line.match(/(L|R)(\d+)/) as RegExpMatchArray)
            .map(([, direction, distanceStr]) => {
                const distance = parseInt(distanceStr, 10)
                return direction === 'R' ? distance : -distance
            })
    }

    public solveFirst(): unknown {
        let start = 50
        let result = 0

        this.input.forEach((offset) => {
            start = (start + (offset % 100) + 100) % 100

            if (start === 0) {
                result++
            }
        })

        return result
    }

    public solveSecond(): unknown {
        let start = 50
        let crossings = 0

        this.input.forEach(move)

        return crossings

        function move(offset: number) {
            const end = start + offset

            // Count multiples of 100 in the interval [start, end],
            // that's how often we cross zero
            const first = Math.ceil(Math.min(start, end) / 100)
            const last = Math.floor(Math.max(start, end) / 100)

            let zeroCrossings = Math.max(0, last - first + 1)

            // If we start at 0, we have already counted that
            if (start % 100 === 0 && zeroCrossings > 0) {
                zeroCrossings--
            }

            crossings += zeroCrossings
            start = ((end % 100) + 100) % 100
        }
    }
}
