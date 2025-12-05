import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

export default class Day5 extends AbstractPuzzle {
    @Cached()
    get input() {
        const [ranges, ingredients] = this.rawInput.split('\n\n')
        return {
            ranges: ranges.split('\n').map((range) => range.split('-').map(Number)),
            ingredients: ingredients.split('\n').map(Number),
        }
    }

    public solveFirst(): unknown {
        const fresh = new Set()

        this.input.ingredients.forEach((ingredient) => {
            this.input.ranges.forEach(([lo, hi]) => {
                if (ingredient >= lo && ingredient <= hi) {
                    fresh.add(ingredient)
                }
            })
        })

        return fresh.size
    }

    public solveSecond(): unknown {
        const ranges = this.input.ranges.sort(([lo1], [lo2]) => lo1 - lo2)
        const result = [ranges.shift()!]

        ranges.forEach(([lo, hi]) => {
            const [, lastHi] = result[result.length - 1]

            if (lo > lastHi) {
                result.push([lo, hi])
            } else {
                result[result.length - 1]![1] = Math.max(lastHi, hi)
            }
        })

        return result.reduce((acc, range) => acc + range![1] - range![0] + 1, 0)
    }
}
