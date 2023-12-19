import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'

type Instruction = [direction: [dr: number, dc: number], distance: number, color: string]

const mapDirection = (direction: string): [dx: number, dy: number] => {
  switch (direction) {
    case 'U':
      return [0, -1]
    case 'D':
      return [0, 1]
    case 'L':
      return [-1, 0]
    case 'R':
      return [1, 0]
    default:
      throw new Error('Unknown direction')
  }
}

// Get the area of a polygon by its cartesian coordinates
function shoelace(points: [number, number][]): number {
  let area = 0
  for (let i = 0; i < points.length; i++) {
    let j = (i + 1) % points.length
    area += points[i][0] * points[j][1]
    area -= points[j][0] * points[i][1]
  }
  return Math.abs(area / 2)
}

export default class Day18 extends AbstractPuzzle {
  _input?: Instruction[]
  get input(): Instruction[] {
    if (!this._input) {
      this._input = this.rawInput.split('\n').map((line) => {
        const [, direction, distance, color] = Array.from(
          line.match(/([LRUD]) (\d+) \((#[0-9a-f]{6})\)/)!
        )
        return [mapDirection(direction), parseInt(distance), color] as Instruction
      })
    }

    return this._input
  }

  public solveFirst(): unknown {
    const points: [row: number, col: number][] = [[0, 0]]
    let boundary = 0
    this.input.forEach(([[dr, dc], distance]) => {
      boundary += distance
      const [r, c] = points[points.length - 1]
      points.push([r + dr * distance, c + dc * distance])
    })

    const area = shoelace(points)

    // Pick's theorem
    const interiour = area - boundary / 2 + 1
    return interiour + boundary
  }

  public solveSecond(): unknown {
    return null
  }
}
