import AbstractPuzzle from '@utils/AbstractPuzzle'
import { permute } from '@utils/numbers'
import { Cached } from '@utils/utils'

import { Computer, run } from '2019/shared/computer'

export default class Day7 extends AbstractPuzzle {
    @Cached()
    get input() {
        return this.rawInput.trim().split(',').map(Number)
    }

    public solveFirst(): unknown {
        let result = 0

        const generator = permute([0,1,2,3,4])
        let phaseSettings = generator.next()
        let a, b, c, d, e
        while(!phaseSettings.done) {
            let output = this.executeChain(phaseSettings.value)

            if (output > result) {
                result = output
            }

            phaseSettings = generator.next()
        }


        return result
    }

    public solveSecond(): unknown {
        const phases = [5, 6, 7, 8, 9]
        let result = 0

        for (const permutation of permute([...phases])) {
            const amplifiers = permutation.map(phase => new Computer(this.input, [phase]))

            let signal = 0
            let allHalted = false

            while (!allHalted) {
                allHalted = true

                for (const amplifier of amplifiers) {
                    if (!amplifier.halted) {
                        amplifier.addInput(signal)
                        amplifier.run()
                        const output = amplifier.getLastOutput()

                        if (output !== null) {
                            signal = output
                        }

                        if (!amplifier.halted) {
                            allHalted = false
                        }
                    }
                }
            }

            if (signal > result) {
                result = signal
            }
        }

        return result
    }

    private executeChain([a, b, c, d, e]: number[], start = 0): number {
        const ra = run(this.input, a, start)
        const rb = run(this.input, b, ra.outputs[0])
        const rc = run(this.input, c, rb.outputs[0])
        const rd = run(this.input, d, rc.outputs[0])
        return run(this.input, e, rd.outputs[0]).outputs[0]
    }
}
