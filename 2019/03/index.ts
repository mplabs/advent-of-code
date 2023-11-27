import AbstractPuzzle from '@utils/AbstractPuzzle'

type Coordinate = [x: number, y: number]
type Instruction = [direction: string, distance: number]

export const manhattenDistance = ([x1, y1]: Coordinate, [x2, y2]: Coordinate): number =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

export default class Day3 extends AbstractPuzzle {
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

  public solveFirst(): unknown {
    const [wire1, wire2] = this.input

    let wire = new Set<string>(),
      intersections = new Set<string>(),
      lastCoordinate = [1, 1] // central port
    wire1.forEach(([direction, distance]) => {
      for (let i = 0; i < distance; i++) {
        switch (direction) {
          case 'U':
            lastCoordinate = [lastCoordinate[0], ++lastCoordinate[1]]
            break
          case 'R':
            lastCoordinate = [++lastCoordinate[0], lastCoordinate[1]]
            break
          case 'D':
            lastCoordinate = [lastCoordinate[0], --lastCoordinate[1]]
            break
          case 'L':
            lastCoordinate = [--lastCoordinate[0], lastCoordinate[1]]
            break
          default:
            throw new Error(`Unknown direction'${direction}'`)
        }
        wire.add(JSON.stringify(lastCoordinate))
      }
    })

    // reset to central port
    lastCoordinate = [1, 1]
    wire2.forEach(([direction, distance]) => {
      for (let i = 0; i < distance; i++) {
        switch (direction) {
          case 'U':
            lastCoordinate = [lastCoordinate[0], ++lastCoordinate[1]]
            break
          case 'R':
            lastCoordinate = [++lastCoordinate[0], lastCoordinate[1]]
            break
          case 'D':
            lastCoordinate = [lastCoordinate[0], --lastCoordinate[1]]
            break
          case 'L':
            lastCoordinate = [--lastCoordinate[0], lastCoordinate[1]]
            break
          default:
            throw new Error(`Unknown direction'${direction}'`)
        }
        if (wire.has(JSON.stringify(lastCoordinate))) {
          intersections.add(JSON.stringify(lastCoordinate))
        }
      }
    })

    let minDistance = Infinity
    intersections.forEach((intersection) => {
      const coordinate = JSON.parse(intersection)
      const distance = manhattenDistance([1, 1], coordinate)
      if (distance < minDistance) {
        minDistance = distance
      }
    })

    return minDistance
  }

  public solveSecond(): unknown {
    return null
  }
}
