import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'
import { hex2dec } from '@utils/numbers'

type Instruction = [direction: [dr: number, dc: number], distance: number]

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
  _input?: string[]
  get input(): string[] {
    if (!this._input) {
      this._input = this.rawInput.split('\n')
    }

    return this._input
  }

  public solve(instructions: Instruction[]): number {
    const points: [row: number, col: number][] = [[0, 0]]
    let boundary = 0
    instructions.forEach(([[dr, dc], distance]) => {
      boundary += distance
      const [r, c] = points[points.length - 1]
      points.push([r + dr * distance, c + dc * distance])
    })

    const area = shoelace(points)

    // Pick's theorem
    const interiour = area - boundary / 2 + 1

    return interiour + boundary
  }

  public solveFirst(): unknown {
    const instructions = this.input.map((line) => {
      const [, direction, distance] = Array.from(line.match(/([LRUD]) (\d+)/)!)
      return [mapDirection(direction), parseInt(distance)] as Instruction
    })

    return this.solve(instructions)
  }

  public solveSecond(): unknown {
    const instructions = this.input.map((line) => {
      const [, distanceHex, directionHex] = line.match(/\(#([0-9a-f]{5})([0-9a-f])\)/)!
      const distance = hex2dec(distanceHex)
      const direction = [
        [1, 0], // 0: R
        [0, 1], // 1: D
        [-1, 0], // 2: L
        [0, -1], // 3: U
      ][hex2dec(directionHex)]
      return [direction, distance] as Instruction
    })

    return this.solve(instructions)
  }
}
