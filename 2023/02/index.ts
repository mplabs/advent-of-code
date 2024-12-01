
import AbstractPuzzle from '@utils/AbstractPuzzle'

type Games = Record<number, Set[]>
type Set = Cube[]
type Cube = { [color: string]: number }

export default class Day2 extends AbstractPuzzle {
  _input?: Games
  get input() {
    if (!this._input) {
      this._input = {}
      this.rawInput.split('\n').forEach((line) => {
        const [,gameId, right] = line.match(/^Game (\d+): (.*)/)!
        const sets = right.split('; ')
        const cubes = sets.map((set) => set.split(', ').map((cube) => {
          const [count, color] = cube.split(' ')
          return [color, Number(count)] as [string, number]
        }))
        this._input = {
          ...this._input,
          [Number(gameId)]: cubes,
        }
        // this._input = {
        //   ...this._input,
        //   [Number(gameId)]: Object.fromEntries(sets.map((set) => {
        //     const [count, color] = cube.split(' ')
        //     return [color, Number(count)]
        //   })),
        // }
      })
    }

    return this._input
  }

  public solveFirst(): unknown {
    this.input

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
  