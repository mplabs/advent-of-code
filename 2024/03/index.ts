
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day3 extends AbstractPuzzle {
  public solveFirst(): unknown {
    const instructions = this.rawInput.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm)

    let result = 0
    for (const instruction of instructions) {
      const [,first,second] = instruction
      result += parseInt(first) * parseInt(second)
    }

    return result
  }

  public solveSecond(): unknown {
    const instructions = this.rawInput.matchAll(/don't\(\)|do\(\)|mul\((\d{1,3}),(\d{1,3})\)/gm)

    let result = 0, semaphore = true
    for (const instruction of instructions) {
      const [ins, first, second] = instruction
      if (ins.match(/don't/)) {
        semaphore = false
      } else if (ins.match(/do/)) {
        semaphore = true
      } else if (semaphore) {
        result += parseInt(first) * parseInt(second)
      }
    }

    return result
  }
}
  