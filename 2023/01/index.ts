import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day1 extends AbstractPuzzle {
  get input(): string[] {
    return this.rawInput.split('\n')
  }

  public solveFirst(): number {
    return this.input
      .map((l) => Array.from(l.matchAll(/\d/g)))
      .map((l) => [l[0], l[l.length - 1]])
      .map((l) => 10 * parseInt(l[0]) + parseInt(l[1]))
      .reduce((a, b) => a + b, 0)
  }

  public solveSecond(): number {
    const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const regExp = new RegExp(`(?=(${digits.join('|')}|\\d))`, 'g')

    const mapDigits = (match: string) => {
      if (!Number.isNaN(parseInt(match))) {
        return parseInt(match)
      }

      return digits.findIndex((d) => d === match) + 1
    }

    return this.input
      .map((l) => Array.from(l.matchAll(regExp)).map(m => mapDigits(m[1])))
      .map((l) => [l[0], l[l.length - 1]])
      .map((l) => 10 * parseInt(l[0]) + parseInt(l[1]))
      .reduce((a, b) => a + b, 0)
  }
}
