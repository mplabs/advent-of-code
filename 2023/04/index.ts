import AbstractPuzzle from '@utils/AbstractPuzzle'
import { intersection, range } from '@utils/array'

export default class Day4 extends AbstractPuzzle {
  private _input?: string[]
  get input(): string[] {
    if (!this._input) {
      this._input = this.rawInput.split('\n')
    }
    return this._input
  }

  public solveFirst(): unknown {
    const points = this.input.reduce((acc, line) => {
      const [_, numbers = ''] = line.split(':')
      const [winning, yours] = numbers.split('|').map((n) => n.trim().split(/\s+/).map(Number))
      const matches = intersection(winning, yours).length

      // The first match makes the card worth one point and each match after the first
      // doubles the point value of that card.
      return acc + (matches ? 2 ** (matches - 1) : 0)
    }, 0)

    return points
  }

  public solveSecond(): unknown {
    const pointsMap = new Map<number, number>()

    for (let i = this.input.length - 1; i >= 0; i--) {
      const [card, numbers = ''] = this.input[i].split(':')
      const [winning, yours] = numbers.split('|').map((n) => n.trim().split(/\s+/).map(Number))
      const matches = intersection(winning, yours).length

      let newCards = matches
      for (let j = 1; j <= matches; j++) {
        if (i + j < this.input.length) {
          newCards += pointsMap.get(i + j) ?? 0
        }
      }

      pointsMap.set(i, newCards)
    }

    return (
      Array.from(pointsMap.values()).reduce((acc, points) => acc + points, 0) + this.input.length
    )
  }
}
