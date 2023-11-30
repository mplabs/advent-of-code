
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day1 extends AbstractPuzzle {
  get input() {
    return this.rawInput.split('\n')
  }

  private aggregate(): number[] {
    const aggregate = [0]

    let i = 0
    for (const line of this.input) {
      if (line === '') {
        i++
        aggregate[i] = 0
        continue
      }
      aggregate[i] += Number(line)
    }

    return aggregate
  }

  public solveFirst(): number {
    const calories = this.aggregate()
    return calories.sort((a, b) => a - b)[calories.length - 1]
  }

  public solveSecond(): number {
    const calories = this.aggregate()
    return calories
      .sort((a, b) => a - b)
      .slice(-3)
      .reduce((a, b) => a + b, 0)
  }
}
  