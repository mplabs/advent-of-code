import AbstractPuzzle from '@utils/AbstractPuzzle'
import { sum } from '@utils/numbers'

export default class Day12 extends AbstractPuzzle {
    get input() {
        // regions
        const regions = this.rawInput.split('\n').slice(30).map(line => {
            const [,width, height] = line.match(/(\d+)x(\d+)/)!.map(Number)
            const values = line.split(':')[1].trim().split(' ').map(Number)

            return { width, height, values }
        })

        return { regions }
    }

    public solveFirst(): unknown {
        let result = 0
        this.input.regions.forEach(({ width, height, values }) => {
            if (8 * sum(...values) < width * height) {
                result++
            }
        })

        return result
    }

    public solveSecond(): unknown {
        return null
    }
}
