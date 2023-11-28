import AbstractPuzzle from '@utils/AbstractPuzzle'

type Instruction = [direction: string, distance: number]

const DX: Record<string, number> = { L: -1, R: 1, U: 0, D: 0 }
const DY: Record<string, number> = { L: 0, R: 0, U: 1, D: -1 }

function getPoints(instructions: Instruction[]): Map<string, number> {
  let x = 0,
    y = 0,
    length = 0
  const points = new Map<string, number>()
  for (const [direction, distance] of instructions) {
    for (let i = 0; i < distance; i++) {
      x += DX[direction]
      y += DY[direction]
      length++
      const serializedCoordinates = JSON.stringify([x, y])
      if (!points.has(serializedCoordinates)) {
        points.set(serializedCoordinates, length)
      }
    }
  }

  return points
}

export default class Day3 extends AbstractPuzzle {
  pointsA: Map<string, number>
  pointsB: Map<string, number>
  both: Set<string>

  get input() {
    return (
      this.rawInput
        // One line per wire
        .split('\n')
        // Instructions are comma-separated
        .map((line) => line.split(','))
        // parse into [string, number] pairs
        .map((instructions) =>
          instructions.map((instruction) => {
            const [, one, two] = Array.from(instruction.match(/(\w)(\d+)/)!)
            return [one, Number.parseInt(two, 10)] as Instruction
          })
        )
    )
  }

  constructor(input: string) {
    super(input)

    const [wireA, wireB] = this.input

    this.pointsA = getPoints(wireA)
    this.pointsB = getPoints(wireB)

    const setA = new Set(this.pointsA.keys()) as Set<string>
    const setB = new Set(this.pointsB.keys()) as Set<string>

    // Typescript does not like Set.prototype.intersection, but bun does.
    // @ts-ignore
    this.both = setA.intersection(setB)
  }

  public solveFirst(): unknown {
    return Math.min(
      ...Array.from(this.both)
        .map((key) => JSON.parse(key))
        .map(([x, y]) => Math.abs(x) + Math.abs(y))
    )
  }

  public solveSecond(): unknown {
    return Math.min(
      ...Array.from(this.both).map((point) => this.pointsA.get(point)! + this.pointsB.get(point)!)
    )
  }
}
