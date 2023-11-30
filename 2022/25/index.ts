
import AbstractPuzzle from '@utils/AbstractPuzzle'

const snafuToArabic = new Map<string, number>()
snafuToArabic.set('2', 2)
snafuToArabic.set('1', 1)
snafuToArabic.set('0', 0)
snafuToArabic.set('-', -1)
snafuToArabic.set('=', -2)

const arabicToSnafu = new Map(
  [...snafuToArabic.entries()].map(([k, v]) => [v, k])
)

export default class Day25 extends AbstractPuzzle {
  get input() {
    return this.rawInput
  }

  snafu(dec: number): string {
    const digits = dec.toString(5).split('').map(Number)
    let idx = digits.findIndex((digit) => digit > 2)
    while (idx !== -1) {
      digits[idx] -= 5
      if (idx > 0) {
        digits[idx - 1]++
      } else {
        digits.unshift(1)
      }
      idx = digits.findIndex((digit) => digit > 2)
    }

    return digits.map((digit) => arabicToSnafu.get(digit)).join('')
  }

  deSnafu(snafu: string): number {
    const digits = Array.from(snafu)
      .map((digit) => snafuToArabic.get(digit) as number)
      .reverse()

    let result = 0
    for (let decimal = 0; decimal < digits.length; decimal++) {
      result += digits[decimal] * Math.pow(5, decimal)
    }

    return result
  }

  public solveFirst(): string {
    const result = this.input
      .split('\n')
      .map(this.deSnafu)
      .reduce((acc, cur) => acc + cur, 0)

    return this.snafu(result)
  }

  public solveSecond(): string {
    return 'DNF'
  }
}
  