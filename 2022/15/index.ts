
import AbstractPuzzle from '@utils/AbstractPuzzle'

type Point = [x: number, y: number]

const eq = ([x, y]: Point, [u, v]: Point) => x === u && y === v

const distance = (x: number, y: number, u: number, v: number) => Math.abs(u - x) + Math.abs(v - y)

export default class Day15 extends AbstractPuzzle {
  static SCAN_ROW = 2000000
  static MIN = 0
  static MAX = 4000000

  get input(): number[][] {
    return this.rawInput
      .split('\n')
      .map(l => l.match(/(-?\d+)/g)!.map(Number))
  }

  public solveFirst(): number {
    const nonBeacons = new Set<number>()

    this.input.forEach(([sx, sy, bx, by]) => {
      const radius = Math.abs(bx - sx) + Math.abs(by - sy)
      const distanceToScanRow = Math.abs(Day15.SCAN_ROW - sy)
      let numberOfSteps = radius - distanceToScanRow

      if (numberOfSteps < 0) {
        return
      }

      for (let x = sx - numberOfSteps; x < sx + numberOfSteps + 1; x++) {
        if (x !== bx || Day15.SCAN_ROW !== by) {
          nonBeacons.add(x)
        }
      }
    })

    return nonBeacons.size
  }

  public solveSecond(): number {
    const orthoplexes: number[][] = this.input.map(([sx, sy, bx, by]) => [
      sx,
      sy,
      Math.abs(bx - sx) + Math.abs(by - sy),
    ])

    for (let [xa, ya, ra] of orthoplexes) {
      for (let [xb, yb, rb] of orthoplexes) {
        const a = xa - ya - ra
        const b = xb + yb + rb
        const X = Math.floor((b + a) / 2)
        const Y = Math.floor((b - a) / 2 + 1)
        if (0 < X && X < Day15.MAX && 0 < Y && Y <= Day15.MAX && orthoplexes.every(([x, y, r]) => distance(X, Y, x, y) > r)) {
          return Day15.MAX * X + Y
        }
      }
    }

    return 0
  }
}
  