import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'

export default class Day6 extends AbstractPuzzle {
  races?: { time: number; distance: number }[]
  raceTimes?: number[]
  raceDistances?: number[]

  constructor(input: string) {
    super(input)

    const [timeLine, distanceLine] = input
      .split('\n')
      .map((line) => line.split(':')[1].trim().matchAll(/\d+/g))
      .map((match) => Array.from(match).map((m) => parseInt(m[0])))

    this.races = timeLine.map((time, index) => ({ time, distance: distanceLine[index] }))
  }

  solveQuadratic(a: number, b: number, c: number): number[] {
    const delta = b * b - 4 * a * c
    if (delta < 0) return []
    if (delta === 0) return [-b / (2 * a)]
    return [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)]
  }

  public solveFirst(): unknown {
    return this.races?.reduce((acc, { time, distance }) => {
      const solutions = this.solveQuadratic(1, time, -distance)
      const numberOfWays = Math.floor(solutions[1]) - Math.ceil(solutions[0])
      console.log({ solutions, numberOfWays })
      return acc * (Math.floor(solutions[1]) - Math.ceil(solutions[0]))
    }, 1)

    // const solutions = this.solveQuadratic(-1, 7, -7).sort((a, b) => a - b)

    // return Array.from(range(Math.ceil(solutions[0]), Math.floor(solutions[1]))).reduce(
    //   (acc, cur) => acc + cur,
    //   0
    // )
  }

  public solveSecond(): unknown {
    return null
  }
}
