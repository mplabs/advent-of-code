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
        const total = this.input
            .map(machine => this.BFS(machine))
            .reduce((a, b) => a + b, 0)

        return total
    }

    public solveSecond(): unknown {
        return null
    }

    private BFS({ indicator, buttons }: (typeof this.input)[0]): number {
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
