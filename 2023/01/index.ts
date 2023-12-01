import AbstractPuzzle from '@utils/AbstractPuzzle'

export function getDigits(str: string): number[] {
  return Array.from(str.matchAll(/one|two|three|four|five|six|seven|eight|nine|\d/g))
    .map((m) => m[0])
    .map(parseNumber)
}

export function parseNumber(inStr: string): number {
  switch (inStr) {
    case 'one':
      return 1
    case 'two':
      return 2
    case 'three':
      return 3
    case 'four':
      return 4
    case 'five':
      return 5
    case 'six':
      return 6
    case 'seven':
      return 7
    case 'eight':
      return 8
    case 'nine':
      return 9
    default:
      return parseInt(inStr)
  }
}

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
    return this.input
      .map((l) => Array.from(l.match(/\d|one|two|three|four|five|six|seven|eight|nine/g)))
      .map((l) => [l[0], l[l.length - 1]])
      .map((l) => 10 * parseNumber(l[0]) + parseNumber(l[1]))
      .reduce((a, b) => a + b, 0)
  }
}
