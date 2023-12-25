
import AbstractPuzzle from '@utils/AbstractPuzzle'

type Point = [x: number, y: number, z? : number]

type Stone = [
  [px: number, py: number, pz: number],
  [vx: number, vy: number, vz: number],
]

export default class Day24 extends AbstractPuzzle {
  _input?: Stone[]
  get input(): Stone[] {
    if (!this._input) {
      this._input = this.rawInput.split('\n').map((line) => {
        const [pos, vel] = line.split(' @ ')
        const [px, py, pz] = pos.split(', ')
        const [vx, vy, vz] = vel.split(', ')
        return [
          [parseInt(px), parseInt(py), parseInt(pz)],
          [parseInt(vx), parseInt(vy), parseInt(vz)],
        ]
      })
    }

    return this._input
  }

  intersect2D([x1, y1]: Point, [x2, y2]: Point): Point {
    const x = (y2 - y1) / (x2 - x1)
    const y = y1 - x1 * x

    return [x, y]
  }

  public solveFirst(): unknown {
    console.log(this.input)

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
  