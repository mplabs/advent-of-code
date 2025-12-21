import AbstractPuzzle from '@utils/AbstractPuzzle'
import { run } from '../shared/computer'

export default class Day2 extends AbstractPuzzle {
    get input() {
        return this.rawInput.split(',').map(Number)
    }

    public solveFirst(): number {
        const opcodes = [...this.input]
        opcodes[1] = 12 // noun
        opcodes[2] = 2 // verb

        return run(opcodes).memory[0]
    }

    public solveSecond(): number | null {
        for (let noun = 0; noun < 100; noun++) {
            for (let verb = 0; verb < 100; verb++) {
              const opcodes = [...this.input]
              opcodes[1] = noun
              opcodes[2] = verb

                if (run(opcodes).memory[0] === 19690720) {
                    return 100 * noun + verb
                }
            }
        }

        return null
    }
}
