import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day2 extends AbstractPuzzle {
  get input() {
    return this.rawInput.split(',').map((chunk) => Number.parseInt(chunk, 10))
  }

  private run(codes: number[], noun: number, verb: number): number {
    // Create a shallow clone
    const memory = [...codes]

    memory[1] = noun
    memory[2] = verb

    for (let ip = 0; ip < memory.length; ip += 4) {
      const [opcode, first, second, third] = memory.slice(ip)

      switch (opcode) {
        case 1:
          memory[third] = memory[first] + memory[second]
          break

        case 2:
          memory[third] = memory[first] * memory[second]
          break

        case 99:
          return memory[0]
        default:
          throw new Error(`Unknown opcode ${opcode} at position ${ip}`)
      }
    }

    return memory[0]
  }

  public solveFirst(): number {
    return this.run(this.input, 12, 2)
  }

  public solveSecond(): number | null {
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        if (this.run(this.input, noun, verb) === 19690720) {
          return 100 * noun + verb
        }
      }
    }

    return null
  }
}
