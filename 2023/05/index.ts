import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'

export default class Day5 extends AbstractPuzzle {
  _input?: string[]
  get input(): string[] {
    if (!this._input) {
      this._input = this.rawInput.split('\n\n')
    }
    return this._input
  }

  _seeds?: number[]
  get seeds(): number[] {
    if (!this._seeds) {
      this._seeds = this.input
        .filter((block) => block.startsWith('seeds:'))
        .map((block) => Array.from(block.matchAll(/(\d+)/g)).map((match) => parseInt(match[1])))
        .flat()
    }

    return this._seeds
  }

  _seedToSoil?: Map<number, number>
  get seedToSoil(): Map<number, number> {
    if (!this._seedToSoil) {
      this._seedToSoil = new Map<number, number>()
      this.input
        .filter((block) => block.startsWith('seed-to-soil map:'))[0]
        .split('\n')
        .slice(1)
        .map((line) => line.split(' ').map(Number))
        .forEach(([soil, seed, length]) => {
          for (const i of range(soil, soil + length)) {
            for (const j of range(seed, seed + length)) {
              this._seedToSoil!.set(j, i)
            }
          }
        })
    }

    return this._seedToSoil
  }

  public solveFirst(): unknown {
    console.log(this.seedToSoil)

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
