
import AbstractPuzzle from '@utils/AbstractPuzzle'

type Voxel = [x: number, y: number, y: number]

const sides = ([x,y,z]: Voxel): Voxel[] => [
  [x + 1, y, z],
  [x - 1, y, z],
  [x, y + 1, z],
  [x, y - 1, z],
  [x, y, z + 1],
  [x, y, z - 1],
]

export default class Day18 extends AbstractPuzzle {
  protected _input?: Set<string>
  get input() {
    if (!this._input) {
      this._input = new Set(this.rawInput.split('\n'))
    }

    return this._input
  }

  public solveFirst(): number {
    let result = 0
    for (const cube of this.input) {
      for (const side of sides(cube.split(',').map(Number) as Voxel)) {
        if (!this.input.has(side.join(','))) {
          result++
        }
      }
    }

    return result
  }

  public solveSecond(): number {
    const seen = new Set<string>()
    let toCheck: Voxel[] = [[0, 0, 0]]
    let result = 0

    while (toCheck.length > 0) {
      const current = toCheck.pop() as Voxel
      seen.add(current.join(','))
      for (const side of sides(current)) {
        if (
          !this.input.has(side.join(',')) &&
          !seen.has(side.join(',')) &&
          side.every((value) => -1 <= value && value <= 25)
        ) {
          toCheck.push(side)
        }
      }
    }

    for (const cube of this.input) {
      for (const side of sides(cube.split(',').map(Number) as Voxel)) {
        if (seen.has(side.join(','))) {
          result++
        }
      }
    }

    return result
  }
}
  