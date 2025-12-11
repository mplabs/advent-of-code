import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached, Memoized } from '@utils/utils'

export default class Day11 extends AbstractPuzzle {
    @Cached()
    get input() {
        const result = new Map<string, string[]>()

        const lines = this.rawInput.split('\n')
        lines.forEach((line) => {
            const [device, outputs] = line.split(': ')
            result.set(device, outputs.split(' '))
        })

        return result
    }

    public solveFirst(): unknown {
        let result = 0
        const path: string[] = []

        const dfs = (device: string) => {
            path.push(device)

            if (device === 'out') {
                result++
            } else if (this.input.has(device)) {
                for (const output of this.input.get(device)!) {
                    dfs(output)
                }
            }

            path.pop()
        }

        dfs('you')

        return result
    }

    public solveSecond(): unknown {
        const paths = (from: string, to: string): number => {
            const cache = new Map<string, number>()

            const dfs = (device: string): number => {
                if (device === to) {
                    return 1
                }

                if (cache.has(device)) {
                    return cache.get(device)!
                }

                let total = 0
                for (const next of this.input.get(device) ?? []) {
                    total += dfs(next)
                }

                cache.set(device, total)

                return total
            }

            return dfs(from)
        }

        // In our puzzle input, We only ever go through fft first
        const svrToFft  = paths('svr', 'fft')
        const fftToDac  = paths('fft', 'dac')
        const dacToOut  = paths('dac', 'out')

        return svrToFft * fftToDac * dacToOut
    }
}
