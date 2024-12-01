
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { countValueInArray } from '@utils/array';

export default class Day1 extends AbstractPuzzle {
  get input(): string[] {
    return this.rawInput.split('\n');
  }

  public solveFirst(): number {
    const left = [], right = []

    for (const line of this.input) {
      const [first, second] = line.split('   ')
      left.push(parseInt(first))
      right.push(parseInt(second))
    }

    left.sort((a, b) => a - b)
    right.sort((a, b) => a - b)

    let distance = 0
    for (let i = 0; i < left.length; i++) {
      distance += Math.abs(left[i] - right[i])
    }

    return distance
  }

  public solveSecond(): unknown {
    const left: number[] = []
    const right: number[] = []

    for (const line of this.input) {
      const [first, second] = line.split('   ')
      left.push(parseInt(first))
      right.push(parseInt(second))
    }

    const similarityScore = left.reduce((acc, value) => acc + value * countValueInArray(right, value), 0)

    return similarityScore
  }
}
  