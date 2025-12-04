import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'
import { type Grid, adjacent, forEachCell } from '@utils/grid'

function getValidPositions(grid: Grid, width: number, height: number): string[] {
    const result: string[] = []

    for (const [coord, value] of grid.entries()) {
        if (!value) {
            continue
        }

        const neighborsTrue = adjacent(coord, width, height).reduce(
            (sum, curr) => sum + (grid.get(curr) ? 1 : 0),
            0,
        )

        if (neighborsTrue < 4) {
            result.push(coord)
        }
    }

    return result
}

export default class Day4 extends AbstractPuzzle {
    @Cached()
    get input() {
        const result = new Map<string, boolean>()
        const lines = this.rawInput.split('\n')

        for (let y = 0; y < lines.length; y++) {
            const values = lines[y].split('')
            for (let x = 0; x < values.length; x++) {
                result.set(`${x},${y}`, values[x] === '@')
            }
        }

        return result
    }

    public solveFirst(): unknown {
        let result = 0

        const lines = this.rawInput.split('\n')
        const height = lines.length
        const width = lines[0].length

        const valid = getValidPositions(this.input, width, height)
        return valid.length
    }

    public solveSecond(): unknown {
        const lines = this.rawInput.split('\n')
        const height = lines.length
        const width = lines[0].length

        // Make a copy for modification
        let grid: Grid = new Map(this.input)

        let total = 0
        let validNow: string[]

        do {
            validNow = getValidPositions(grid, width, height)

            // Add how many were found this round
            total += validNow.length

            // Remove those from the map
            for (const coord of validNow) {
                grid.set(coord, false)
            }
        } while (validNow.length > 0)

        return total
    }
}
