import AbstractPuzzle from '@utils/AbstractPuzzle'

interface Computer {
    A: number
    B: number
    C: number
    ip: number
}

export default class Day17 extends AbstractPuzzle {
    public solveFirst(): unknown {
        const initialState: Computer = {
            A: 22571680,
            B: 0,
            C: 0,
            ip: 0,
        }
        const program = [2,4,1,3,7,5,0,3,4,3,1,5,5,5,3,0]
        
        const stdout: number[] = []
        const next = (state: Computer, program: number[]): Computer | null => {

            // Reached the end
            if (state.ip >= program.length) {
                return null
            }

            const opcode = program[state.ip]
            let operand = program[state.ip + 1]

            // Combo operand 7 is reserved and will not appear in valid programs.
            if (operand === 7) {
                throw new Error(`Invalid program.`)
            }

            if (operand === 4) {
                operand = state.A
            } else if (operand === 5) {
                operand = state.B
            } else if (operand === 6) {
                operand = state.C
            }

            switch (opcode) {
                case 0: // adv
                    return {
                        ...state,
                        A: Math.floor(state.A / Math.pow(2, operand)),
                        ip: state.ip + 2,
                    }

                case 1: // bxl
                    return {
                        ...state,
                        B: state.B ^ program[state.ip + 1],
                        ip: state.ip + 2,
                    }

                case 2: // bst
                    return {
                        ...state,
                        B: operand % 8,
                        ip: state.ip + 2,
                    }

                case 3: // jnz
                    return state.A === 0
                        ? { ...state, ip: state.ip + 2 }
                        : { ...state, ip: program[state.ip + 1] }

                case 4: // bxc
                    return {
                        ...state,
                        B: state.B ^ state.C,
                        ip: state.ip + 2,
                    }

                case 5: // out
                    stdout.push(operand % 8)
                    return {
                        ...state,
                        ip: state.ip + 2,
                    }

                case 6: // bdv
                    return {
                        ...state,
                        B: Math.floor(state.A / Math.pow(2, operand)),
                        ip: state.ip + 2,
                    }
                
                case 7: // cdv
                    return {
                        ...state,
                        C: Math.floor(state.A / Math.pow(2, operand)),
                        ip: state.ip + 2,
                    }
                
                default:
                    throw new Error(`Invalid instruction: '${opcode}'.`)
            }
        }

        let state: Computer | null = initialState
        while(state = next(state, program)) {}

        return stdout.join(',')
    }

    public solveSecond(): unknown {
        return null
    }
}
