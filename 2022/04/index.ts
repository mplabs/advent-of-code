
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day4 extends AbstractPuzzle {
  get input(): number[][] {
    return this.rawInput
      .split('\n') // lines
      .map((line) =>
        line
          .split(',')
          .flatMap((range) => range.split('-'))
          .map(Number)
      ) // ranges
  }

  public solveFirst(): unknown {
    return this.input
      .map(([a, b, c, d]) => (a <= c && b >= d) || (c <= a && d >= b)) // overlapping
      .reduce((a, b) => a + +b, 0) // sum
  }

  public solveSecond(): unknown {
    return this.input
      .map(([a,b,c,d]) => [a,b-a+1,c,d-c+1]) // start and length
      .map(([r1, w1, r2, w2]) => (r1 < r2 + w2) && (r1 + w1 > r2)) // contains
      .reduce((a, b) => a + +b, 0) // sum
  }
}
  