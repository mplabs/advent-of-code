import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'
import { equal } from '@utils/utils'

type Grid<T> = T[][]

export default class Day13 extends AbstractPuzzle {
  get input(): Grid<string>[] {
    return this.rawInput.split('\n\n').map((block) => block.split('\n').map((row) => row.split('')))
  }

  public search(grid: Grid<string>) {
    for (let y = 1; y < grid.length - 1; y++) {
      const currentRow = grid[y]
      const previousRow = grid[y - 1]

      if (equal(currentRow, previousRow)) {
        let valid = true

        for (const delta of range(0, Math.min(y, grid.length - y))) {
          const nextRow = grid[y + delta]
          const previousRow = grid[y - 1 - delta]

          if (!equal(nextRow, previousRow)) {
            valid = false
            break
          }
        }

        if (valid)
          return {
            orientation: 'H',
            position: y,
          }
      }
    }
  }

  public solveFirst(): unknown {
    this.input.forEach((grid, idx) => {
      const result = this.search(grid)

      if (result) {
        console.log({ [idx]: result })
      }
    })

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
