import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day24 extends AbstractPuzzle {
    static CONNECTION_REGEXP =
        /(?<input1>[0-9a-z]{3}) (?<gateType>AND|XOR|OR) (?<input2>[0-9a-z]{3}) -> (?<output>[0-9a-z]{3})/

    @Cached()
    get input() {
        const [wireBlock, logicBlock] = this.rawInput.split('\n\n')

        const gates = new Map<string, boolean>(
            wireBlock
                .split('\n')
                .map((line) => line.split(': '))
                .map(([name, value]) => [name, value === '1'])
        )

        const logic = logicBlock.split('\n').map((line) => {
            const { input1, input2, output, gateType } = line.match(Day24.CONNECTION_REGEXP)
                ?.groups!
            
            return {
                inputs: [input1, input2],
                gateType,
                output, 
            }
        })

        return { gates, logic }
    }

    get gates() {
        return this.input.gates
    }

    get logic() {
        return this.input.logic
    }

    public solveFirst(): unknown {
        let stable = false
        while (!stable) {
            stable = true

            for (const { inputs, output, gateType } of this.logic) {
                const wire1 = this.gates.get(inputs[0])
                const wire2 = this.gates.get(inputs[1])

                if (wire1 === undefined || wire2 === undefined) {
                    stable = false
                    continue
                }



                switch (gateType) {
                    case 'AND':
                        this.gates.set(output, wire1 && wire2)
                        break
                    
                    case 'OR':
                        this.gates.set(output, wire1 || wire2)
                        break
                    
                    
                    case 'XOR':
                        this.gates.set(output, wire1 !== wire2)
                        break
                    
                    default:
                        // NOOP
                        break
                }
            }
        }

        return Number(`0b${[...this.gates.entries()]
            .filter(([name]) => name.startsWith('z'))
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([,value]) => Number(value))
            .join('')}`)
    }

    public solveSecond(): unknown {
        return null
    }
}
