const decode = (instruction: number): [number, number, number, number] => [
    instruction % 100, // opcode
    Math.floor(instruction / 100) % 10, // m1
    Math.floor(instruction / 1000) % 10, // m2
    Math.floor(instruction / 10000) % 10, // m3
]

const readParam = (memory: number[], param: number, mode: number): number => {
    if (mode === 0) {
        // position mode
        return memory[param] ?? 0
    }

    if (mode === 1) {
        // immediate mode
        return param
    }

    throw new Error(`Unsupported mode ${mode}.`)
}

export function run(codes: number[], ...inputs: number[]): { memory: number[]; outputs: number[] } {
    const memory = [...codes]
    const outputs: number[] = []

    let ip = 0
    let inpPtr = 0

    while (ip < memory.length) {
        const [opcode, m1, m2, m3] = decode(memory[ip])

        switch (opcode) {
            case 1: {
                // add
                const p1 = memory[ip + 1]
                const p2 = memory[ip + 2]
                const dst = memory[ip + 3]
                const a = readParam(memory, p1, m1)
                const b = readParam(memory, p2, m2)
                memory[dst] = a + b
                ip += 4
                break
            }

            case 2: {
                // multiply
                const p1 = memory[ip + 1]
                const p2 = memory[ip + 2]
                const dst = memory[ip + 3]
                const a = readParam(memory, p1, m1)
                const b = readParam(memory, p2, m2)
                memory[dst] = a * b
                ip += 4
                break
            }

            case 3: {
                // input
                const dst = memory[ip + 1]
                if (inpPtr >= inputs.length) {
                    throw new Error(`Opcode 3 requested input out of range`)
                }
                memory[dst] = inputs[inpPtr++]
                ip += 2
                break
            }

            case 4: {
                // output
                const p1 = memory[ip + 1]
                const value = readParam(memory, p1, m1)
                outputs.push(value)
                ip += 2
                break
            }

            case 5: {
                // jump-if-true
                const p1 = memory[ip + 1]
                const p2 = memory[ip + 2]
                const v1 = readParam(memory, p1, m1)
                const v2 = readParam(memory, p2, m2)
                ip = (v1 !== 0) ? v2 : ip + 3
                break;
            }

            case 6: {
                // jump-if-false
                const p1 = memory[ip + 1]
                const p2 = memory[ip + 2]
                const v1 = readParam(memory, p1, m1)
                const v2 = readParam(memory, p2, m2)
                ip = (v1 === 0) ? v2 : ip + 3
                break;
            }

            case 7: {
                // less than
                const p1 = memory[ip + 1]
                const p2 = memory[ip + 2]
                const dst = memory[ip + 3]
                const v1 = readParam(memory, p1, m1)
                const v2 = readParam(memory, p2, m2)
                memory[dst] = v1 < v2 ? 1 : 0
                ip += 4
                break;
            }

            case 8: {
                // equals
                const p1 = memory[ip + 1]
                const p2 = memory[ip + 2]
                const dst = memory[ip + 3]
                const v1 = readParam(memory, p1, m1)
                const v2 = readParam(memory, p2, m2)
                memory[dst] = v1 === v2 ? 1 : 0
                ip += 4
                break;
            }

            case 99: {
                return { memory, outputs }
            }

            default: {
                throw new Error(`Unknown opcode ${opcode} at position ${ip}`)
            }
        }
    }

    return { memory, outputs }
}
