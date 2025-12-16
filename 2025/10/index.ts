import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached, Memoized } from '@utils/utils'

type Pattern = { pattern: number[]; cost: number }

export default class Day10 extends AbstractPuzzle {
    private patterCostByMachine = new Map<number, Pattern[]>()

    @Cached()
    get input() {
        const lines = this.rawInput.split('\n')
        return lines.map((line) => {
            const parts = line.split(' ')
            let indicator = parts.shift()
            let joltage = parts.pop()
            let buttons = parts

            return {
                indicator: indicator!
                    .replace(/[\[\]]/g, '')
                    .split('')
                    .map((ch) => ch === '#')
                    .reduce((mask, on, i) => (on ? mask | (1 << i) : mask), 0),
                buttons: buttons.map((button) =>
                    button
                        .replace(/[()]/g, '')
                        .split(',')
                        .map(Number)
                        .reduce((mask, idx) => mask | (1 << idx), 0),
                ),
                joltage: joltage!.replace(/[{}]/g, '').split(',').map(Number),
            }
        })
    }

    public solveFirst(): unknown {
        const total = this.input.map((machine) => BFS(machine)).reduce((a, b) => a + b, 0)

        return total

        function BFS({ indicator, buttons }: { indicator: number; buttons: number[] }): number {
            if (indicator === 0) {
                return 0
            }

            const visited = new Set<number>()
            const queue: { state: number; dist: number }[] = []

            visited.add(0)
            queue.push({ state: 0, dist: 0 })

            while (queue.length > 0) {
                const { state, dist } = queue.shift()!

                for (const mask of buttons) {
                    const next = state ^ mask

                    if (visited.has(next)) {
                        continue
                    }

                    if (next === indicator) {
                        return dist + 1 // one more press to reach target
                    }

                    visited.add(next)
                    queue.push({ state: next, dist: dist + 1 })
                }
            }

            // No amount of button presses will get the machine on
            throw new Error('Target configuration unreachable')
        }
    }

    public solveSecond(): unknown {
        this.patterCostByMachine.clear()

        let result = 0

        for (let i = 0; i < this.input.length; i++) {
            const machine = this.input[i]

            // Precompute patterns:
            // Each pattern is a vector of counts cerated by pressing a subset of buttons once, each
            this.patterCostByMachine.set(i, this.buildPatterns(machine.buttons, machine.joltage.length))

            result += this.fewestPresses(i, ...machine.joltage)
        }

        return result

    }

    private buildPatterns(buttonMasks: number[], numCounters: number): Pattern[] {
        // Convert each button bitmask into a 0/1 coefficient vector over counters
        const coeffs: number[][] = buttonMasks.map(mask => 
            Array.from({ length: numCounters }, (_, i) => (mask & (1 << i)) !== 0 ? 1 : 0)
        )

        // Enumerate all subsets,
        // store the minimun subset size for each resulting pattern vector
        const out = new Map<string, Pattern>()
        const totalMasks = 1 << coeffs.length

        for (let subset = 0; subset < totalMasks; subset++) {
            let cost = 0
            const pattern = Array.from({ length: numCounters }, () => 0)

            for (let b = 0; b < coeffs.length; b++) {
                if ((subset & (1 << b)) === 0) {
                    continue
                }

                cost++
                const row = coeffs[b]
                for (let i = 0; i < numCounters; i++) {
                    pattern[i] += row[i]
                }
            }

            const key = pattern.join(',')
            const prev = out.get(key)
            if (!prev || cost < prev.cost) {
                out.set(key, { pattern, cost })
            }
        }

        return [...out.values()]
    }

    @Memoized()
    private fewestPresses(machineId: number, ...joltages: number[]): number {
        // No more presses needed
        if (joltages.every(j => j === 0)) {
            return 0
        }

        // Disallow negativ joltages (impossible branch)
        if (joltages.some(j => j < 0)) {
            return Infinity
        }

        const patterns = this.patterCostByMachine.get(machineId)
        if (!patterns) {
            throw new Error(`Missing patterns for machineId=${machineId}`)
        }

        let best = Infinity
        checkPatterns: for (const { pattern, cost } of patterns) {
            // Must be componentwise less than and parity-compatible
            for (let i = 0; i < joltages.length; i++) {
                const p = pattern[i]
                const g = joltages[i]

                if (p > g || ((p ^ g) & 1) !== 0) {
                    continue checkPatterns
                }
            }

            const next = joltages.map((joltage, i) => (joltage - pattern[i]) / 2)
            
            // Press the buttons once
            const candidate = cost + 2 * this.fewestPresses(machineId, ...next)
            if (candidate < best) {
                best = candidate
            }
        }

        return best
    }
}
