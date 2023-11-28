
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day4 extends AbstractPuzzle {
  get input() {
    return this.rawInput
  }

  public test(candidate: number): boolean {
    
  }

  public solveFirst(): unknown {
    const [from, to] = this.input.split('-').map(Number)

    const test = (candidate: number): boolean => {
      if (candidate < from || candidate > to) {
        return false
      }
      if (!/\d{6}/.test(candidate.toString())) {
        return false
      }
      if (!/(\d)\1/.test(candidate.toString())) {
        return false
      }
      let lastDigit = -Infinity
      return Array.from(candidate.toString()).map(Number).every(digit => {
        const result = digit >= lastDigit
        lastDigit = digit
        return result
      })
    }

    console.log({ from, to })

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
  