
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { distinct } from '@utils/array'

export default class Day6 extends AbstractPuzzle {
  get input(): string {
    return this.rawInput
  }

  public solveFirst(): unknown {
    for (let i = 4; i < this.input.length; i++) {
      const window = Array.from(this.input.substring(i - 4, i))
      if (window.filter(distinct).length === 4) {
        return i
      }
    }
    
    throw new Error(`Could not find start-of-packet marker`)
  }

  public solveSecond(): unknown {
    for (let i = 14; i < this.input.length; i++) {
      const window = Array.from(this.input.substring(i - 14, i))
      if (window.filter(distinct).length === 14) {
        return i
      }
    }
    
    throw new Error(`Could not find start-of-message marker`)
  }
}
  