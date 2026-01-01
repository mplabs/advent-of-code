import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day14 extends AbstractPuzzle {
    @Cached()
    get input() {
        const chains: { [k: string]: { outputQty: number; inputs: [k: string, q: number][] } } = {}
        this.rawInput
            .trim()
            .split('\n')
            .forEach((line) => {
                const [ingredientsStr, resultStr] = line.split(' => ')
                const result = resultStr.split(' ')
                const ingredients = ingredientsStr
                    .split(', ')
                    .map((i) => i.split(' '))
                    .map(([q, k]) => [k, Number(q)] as [k: string, q: number])
                chains[result[1]] = { outputQty: Number(result[0]), inputs: ingredients }
            })

        return chains
    }

    public solveFirst(): unknown {
        return this.oreForFuel(1)
    }

    public solveSecond(): unknown {
        const ORE_LIMIT = 1_000_000_000_000
        let lo = 0, hi = 1

        // Approximate (lo, hi]
        while (this.oreForFuel(hi) <= ORE_LIMIT) {
            hi *= 2
        }

        // Binary search for the maximum feasable fuel
        while (lo + 1 < hi) {
            const mid = Math.floor((lo + hi) / 2)
            const ore = this.oreForFuel(mid)
            if (ore <= ORE_LIMIT) {
                lo = mid
            } else {
                hi = mid
            }
        }

        return lo

    }

    private oreForFuel(fuel: number): number {
        const need = new Map<string, number>([['FUEL', fuel]])
        const leftover = new Map<string, number>()
        const work = ['FUEL']
        const inWork = new Set<string>(['FUEL'])

        while (work.length > 0) {
            const k = work.pop()!
            inWork.delete(k)

            if (k === 'ORE') {
                continue
            }

            const curNeed = need.get(k) ?? 0
            if (curNeed === 0) {
                continue
            }

            // consume leftovers
            const left = leftover.get(k) ?? 0
            const used = Math.min(left, curNeed)
            const remaining = curNeed - used
            if (used) {
                leftover.set(k, left - used)
            }

            if (remaining === 0) {
                need.delete(k)
                continue
            }

            const { outputQty, inputs } = this.input[k]
            const runs = Math.ceil(remaining / outputQty)

            // consume this need fully
            need.delete(k)

            // add inputs to need
            for (const [inChem, inQty] of inputs) {
                const add = runs * inQty
                need.set(inChem, (need.get(inChem) ?? 0) + add)

                if (inChem !== 'ORE' && !inWork.has(inChem)) {
                    work.push(inChem)
                    inWork.add(inChem)
                }
            }

            // record leftover output
            const produced = runs * outputQty
            const extra = produced - remaining
            if (extra > 0) {
                leftover.set(k, (leftover.get(k) ?? 0) + extra)
            }
        }

        return need.get('ORE') ?? 0
    }
}
