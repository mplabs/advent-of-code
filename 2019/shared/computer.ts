export function run(codes: number[], ...inputs: number[]): { memory: number[]; outputs: number[] } {
    // Create a new Computer instance
    const computer = new Computer(codes, inputs)

    // Run the computer
    computer.run()

    // Return the results in the same format as the old implementation
    return {
        memory: [...computer['memory']], // Create a copy of memory
        outputs: computer.getOutput(),
    }
}

export class Computer {
    public halted: boolean = false
    public waitingForInput: boolean = false
    
    private memory: number[]
    private ip: number = 0
    private inputs: number[]
    private outputs: number[] = []
    private inputIndex: number = 0
    private relativeBase: number = 0

    constructor(program: number[], initialInputs: number[] = []) {
        this.memory = [...program] // Deep copy
        this.inputs = [...initialInputs]
    }

    // Run until ew need more input or we halt
    public run(pauseOnInput = false): void {
        while (!this.halted && !this.waitingForInput) {
            if (this.ip >= this.memory.length) {
                throw new Error(`ip out of bounds.`)
            }

            const [opcode, m1, m2, m3] = this.decode(this.memory[this.ip])

            switch (opcode) {
                case 1: {
                    // add
                    const p1 = this.memory[this.ip + 1]
                    const p2 = this.memory[this.ip + 2]
                    const p3 = this.memory[this.ip + 3]
                    const a = this.readParam(p1, m1)
                    const b = this.readParam(p2, m2)
                    const dst = this.writeAddr(p3, m3)
                    this.memory[dst] = a + b
                    this.ip += 4
                    break
                }

                case 2: {
                    // multiply
                    const p1 = this.memory[this.ip + 1]
                    const p2 = this.memory[this.ip + 2]
                    const p3 = this.memory[this.ip + 3]
                    const a = this.readParam(p1, m1)
                    const b = this.readParam(p2, m2)
                    const dst = this.writeAddr(p3, m3)
                    this.memory[dst] = a * b
                    this.ip += 4
                    break
                }

                case 3: {
                    // input
                    if (this.inputIndex >= this.inputs.length) {
                        this.waitingForInput = true
                        return
                    }
                    const p1 = this.memory[this.ip + 1]
                    const dst = this.writeAddr(p1, m1)
                    this.memory[dst] = this.inputs[this.inputIndex++]
                    this.ip += 2
                    break
                }

                case 4: {
                    // output
                    const p1 = this.memory[this.ip + 1]
                    const value = this.readParam(p1, m1)
                    this.addOutput(value)
                    this.ip += 2

                    if (pauseOnInput) {
                        return
                    }
                    break
                }

                case 5: {
                    // jump-if-true
                    const p1 = this.memory[this.ip + 1]
                    const p2 = this.memory[this.ip + 2]
                    const v1 = this.readParam(p1, m1)
                    const v2 = this.readParam(p2, m2)
                    this.ip = v1 !== 0 ? v2 : this.ip + 3
                    break
                }

                case 6: {
                    // jump-if-false
                    const p1 = this.memory[this.ip + 1]
                    const p2 = this.memory[this.ip + 2]
                    const v1 = this.readParam(p1, m1)
                    const v2 = this.readParam(p2, m2)
                    this.ip = v1 === 0 ? v2 : this.ip + 3
                    break
                }

                case 7: {
                    // less than
                    const p1 = this.memory[this.ip + 1]
                    const p2 = this.memory[this.ip + 2]
                    const p3 = this.memory[this.ip + 3]
                    const v1 = this.readParam(p1, m1)
                    const v2 = this.readParam(p2, m2)
                    const dst = this.writeAddr(p3, m3)
                    this.memory[dst] = v1 < v2 ? 1 : 0
                    this.ip += 4
                    break
                }

                case 8: {
                    // equals
                    const p1 = this.memory[this.ip + 1]
                    const p2 = this.memory[this.ip + 2]
                    const p3 = this.memory[this.ip + 3]
                    const v1 = this.readParam(p1, m1)
                    const v2 = this.readParam(p2, m2)
                    const dst = this.writeAddr(p3, m3)
                    this.memory[dst] = v1 === v2 ? 1 : 0
                    this.ip += 4
                    break
                }

                case 9: {
                    // adjust the relative base
                    const p1 = this.memory[this.ip + 1]
                    const v1 = this.readParam(p1, m1)
                    this.relativeBase += v1;
                    this.ip += 2
                    break
                }

                case 99: {
                    this.halted = true
                    return
                }

                default: {
                    throw new Error(`Unknown opcode ${opcode} at position ${this.ip}`)
                }
            }
        }
    }

    public runUntilOutput(): number | null {
        const before = this.outputs.length
        this.run(true)
        return this.outputs.length > before ? this.outputs[this.outputs.length - 1] : null
    }

    // Add output to results
    public addOutput(value: number): void {
        this.outputs.push(value)
    }

    // For feedback loop - add input from previous output
    public addInput(value: number): void {
        this.inputs.push(value)
        this.waitingForInput = false
    }

    // Get last output (for feedback loop)
    public getLastOutput(): number | null {
        return this.outputs.length > 0 ? this.outputs[this.outputs.length - 1] : null
    }

    // Reset for reuse (if needed)
    public reset(): void {
        this.ip = 0
        this.halted = false
        this.waitingForInput = false
        this.inputIndex = 0
        this.outputs = []
        this.relativeBase = 0
    }

    // Get current outputs
    public getOutput(): number[] {
        return [...this.outputs]
    }

    public clearOutput(): void {
        this.outputs = []
    }

    public appendInput(...newInputs: number[]) {
        this.inputs.push(...newInputs)
        this.waitingForInput = false
    }

    public clone(): Computer {
        const clone = new Computer([])
        
        // Copy primitives
        clone.halted = this.halted
        clone.waitingForInput = this.waitingForInput
        clone.ip = this.ip
        clone.inputIndex = this.inputIndex
        clone.relativeBase = this.relativeBase

        // Deep copy arrays
        clone.memory = [...this.memory]
        clone.inputs = [...this.inputs]
        clone.outputs = [...this.outputs]

        return clone
    }

    // Helper method for decoding
    private decode(instruction: number): [number, number, number, number] {
        const opcode = instruction % 100
        const modes = Math.floor(instruction / 100)
        return [opcode, modes % 10, Math.floor(modes / 10) % 10, Math.floor(modes / 100) % 10]
    }

    private readParam(param: number, mode: number): number {
        switch (mode) {
            case 0:
                // position mode
                return this.memory[param] ?? 0

            case 1:
                // immediate mode
                return param

            case 2:
                // relative mode
                return this.memory[param + this.relativeBase] ?? 0

            default:
                throw new Error(`Unknown parameter mode: ${mode}`)
        }
    }

    private writeAddr(param: number, mode: number): number {
        switch (mode) {
            case 0:
                return param
            
            case 2:
                return param + this.relativeBase
            
            default:
                throw new Error(`Invalid mode for write parameter: ${mode}`)
        }
    }
}
