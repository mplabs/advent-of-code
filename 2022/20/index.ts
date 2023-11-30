import AbstractPuzzle from '@utils/AbstractPuzzle'
import { range } from '@utils/array'

export default class Day20 extends AbstractPuzzle {
  protected _input?: number[]
  get input() {
    if (!this._input) {
      this._input = this.rawInput.split('\n').map(Number)
    }

    return this._input
  }

  mix(arr: number[], rounds = 1): number[] {
    const numbers = arr.map((number, index) => `${index}:${number}`)
    const result = [...numbers]

    for (const _ of range(rounds)) {
      for (let i = 0; i < numbers.length; i++) {
        const index = numbers[i]
        const number = parseInt(index.split(':')[1])

        // Shift to the left in reverse
        if (number < 0) {
          result.reverse()
        }

        const oldIndex = result.indexOf(index)
        result.splice(oldIndex, 1) // remove at old index
        const newIndex = (oldIndex + Math.abs(number)) % result.length
        result.splice(newIndex, 0, index) // insert at new index

        // Undo reverse from left shift
        if (number < 0) {
          result.reverse()
        }
      }
    }

    return result.map((entry) => entry.split(':').map(Number)[1])
  }

  public solveFirst(): unknown {
    const result = this.mix(this.input)
    const zeroIndex = result.indexOf(0)

    return (
      result[(zeroIndex + 1000) % result.length] +
      result[(zeroIndex + 2000) % result.length] +
      result[(zeroIndex + 3000) % result.length]
    )
  }

  public solveSecond(): unknown {
    const DECRYPTION_KEY = 811589153
    const result = this.mix(
      this.input.map((number) => number * DECRYPTION_KEY),
      10
    )
    const zeroIndex = result.indexOf(0)

    return (
      result[(zeroIndex + 1000) % result.length] +
      result[(zeroIndex + 2000) % result.length] +
      result[(zeroIndex + 3000) % result.length]
    )
  }
}
