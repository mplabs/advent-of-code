import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day10 extends AbstractPuzzle {
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
        const total = this.input
            .map((machine) => minPressesForMachine(machine.buttons, machine.joltage))
            .reduce((a, b) => a + b, 0)

        return total

        function minPressesForMachine(buttonMasks: number[], joltage: number[]): number {
            const numButtons = buttonMasks.length
            const numCounters = joltage.length

            console.log({ buttonMasks, joltage })

            // contrib[button][counter] = 1 if this button increments that counter
            const contrib: number[][] = buttonMasks.map((mask) => {
                const row = new Array<number>(numCounters).fill(0)
                for (let i = 0; i < numCounters; i++) {
                    if (mask & (1 << i)) {
                        row[i] = 1
                    }
                }
                return row
            })

            // Order buttons: more "impactful" ones first (more counters affected)
            const order = [...Array(numButtons).keys()]
            order.sort((a, b) => {
                const ca = contrib[a].reduce((s, v) => s + v, 0)
                const cb = contrib[b].reduce((s, v) => s + v, 0)
                return cb - ca
            })
            const contribOrdered = order.map((i) => contrib[i])

            // Global max counters affected by a single button press
            const maxAffect =
                contribOrdered.reduce(
                    (m, row) =>
                        Math.max(
                            m,
                            row.reduce((s, v) => s + v, 0),
                        ),
                    1,
                ) || 1

            const remaining = joltage.slice()
            let best = Infinity

            function dfs(buttonIdx: number, pressesSoFar: number): void {
                if (pressesSoFar >= best) return

                // Compute sum of remaining and prune if obviously impossible
                let sumRem = 0
                for (let i = 0; i < numCounters; i++) {
                    if (remaining[i] < 0) {
                        // overshot some counter earlier
                        return
                    }
                    sumRem += remaining[i]
                }

                if (sumRem === 0) {
                    // Exactly matched joltage requirements
                    best = pressesSoFar
                    return
                }

                // Lower bound on more presses needed:
                // each press can fix at most `maxAffect` units of remaining across all counters
                const lowerBound = Math.ceil(sumRem / maxAffect)
                if (pressesSoFar + lowerBound >= best) {
                    return
                }

                if (buttonIdx === numButtons) {
                    // No more buttons to use, but still remaining joltage
                    return
                }

                const row = contribOrdered[buttonIdx]

                // Does this button affect anything at all?
                let affectsAny = false
                for (let i = 0; i < numCounters; i++) {
                    if (row[i] === 1) {
                        affectsAny = true
                        break
                    }
                }

                if (!affectsAny) {
                    // Useless button, skip it
                    dfs(buttonIdx + 1, pressesSoFar)
                    return
                }

                // Maximum times we can press this button without overshooting
                let maxPress = Infinity
                for (let i = 0; i < numCounters; i++) {
                    if (row[i] === 1) {
                        maxPress = Math.min(maxPress, remaining[i])
                    }
                }
                if (!Number.isFinite(maxPress)) {
                    maxPress = 0
                }

                // Case 1: don't press this button at all
                dfs(buttonIdx + 1, pressesSoFar)

                // Case 2: press this button pc times, for pc = 1..maxPress
                for (let pc = 1; pc <= maxPress; pc++) {
                    // Apply pc presses of this button
                    for (let i = 0; i < numCounters; i++) {
                        if (row[i] === 1) {
                            remaining[i] -= pc
                        }
                    }

                    dfs(buttonIdx + 1, pressesSoFar + pc)

                    // Roll back
                    for (let i = 0; i < numCounters; i++) {
                        if (row[i] === 1) {
                            remaining[i] += pc
                        }
                    }
                }
            }

            dfs(0, 0)

            if (!Number.isFinite(best)) {
                throw new Error('Target joltage configuration unreachable')
            }

            return best
        }
    }
}
