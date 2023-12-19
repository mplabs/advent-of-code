
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'

export default class Day16 extends AbstractPuzzle {
  private _maxX?: number
  get maxX(): number {
    if (!this._maxX) {
      this._maxX = this.rawInput.split('\n')[0].length
    }

    return this._maxX
  }

  private _maxY?: number
  get maxY(): number {
    if (!this._maxY) {
      this._maxY = this.rawInput.split('\n').length
    }
    return this._maxY
  }

  get input(): Map<string, string> {
    const result = new Map<string, string>()
    for (const x of range(0, this.maxX)) {
        for (const y of range(0, this.maxY)) {
          result.set(`${x},${y}`, this.rawInput.split('\n')[y][x])
        }
      }

    return result
  }

  public ray(from: string, direction: string): string {
    let current = from
    while (true) {
      const [x, y] = current.split(',').map(Number)
      switch (direction) {
        case 'up':
          current = `${x},${y - 1}`
          break
        case 'down':
          current = `${x},${y + 1}`
          break
        case 'left':
          current = `${x - 1},${y}`
          break
        case 'right':
          current = `${x + 1},${y}`
          break
      }

      if (!this.input.has(current)) {
        return '.'
      }

      if (this.input.get(current) !== '.') {
        return this.input.get(current)!
      }
    }
  }

  public solveFirst(): unknown {
    // for (const x of range(0, this.maxX)) {
    //   for (const y of range(0, this.maxY)) {
    //     console.log(x, y)
    //   }
    // }
    
    console.log(this.input)

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
  