
import AbstractPuzzle from '@utils/AbstractPuzzle'

type Number = {
  start: number
  end: number
  value: number
}

export default class Day3 extends AbstractPuzzle {
  _numbers?: Map<number, Number>
  get numbers() {
    if (!this._numbers) {
      this._numbers = new Map<number, Number>()
      for (const [lineIndex, line] of this.input.entries()) {
        Array.from(line.matchAll(/[0-9]+/g)).forEach(match => {
          this._numbers!.set(lineIndex, {
            start: match.index!,
            end: match.index! + match[0].length - 1,
            value: parseInt(match[0], 10)
          })
        })
      }
    }

    return this._numbers
  }

  _symbols?: Set<string>
  get sybols() {
    if (!this._symbols) {
      this._symbols = new Set<string>()
      for (const [lineIndex, line] of this.input.entries()) {
        Array.from(line.matchAll(/[^0-9.]/g)).forEach(match => {
          this._symbols!.add(`${match.index},${lineIndex}`)
        })
      }
    }

    return this._symbols
  }

  _input?: string[]
  get input() {
    if (!this._input) {
      this._input = this.rawInput.split('\n')
    }
    return this._input
  }

  public solveFirst(): unknown {
    console.log({
      numbers: this.numbers,
      symbols: this.sybols
    })

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
  