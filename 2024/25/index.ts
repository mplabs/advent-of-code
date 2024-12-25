import AbstractPuzzle from '@utils/AbstractPuzzle'
import { rotate90Clockwise } from '@utils/matrix'
import { Cached } from '@utils/utils'

export default class Day25 extends AbstractPuzzle {
    @Cached()
    get input() {
        const locks = new Set<number[]>()
        const keys = new Set<number[]>()

        this.rawInput
            .split('\n\n')
            .map((schematic) => schematic.split('\n').map((line) => line.split('')))
            .map((s) => rotate90Clockwise(s))
            .forEach((schematic) => {
                const isLock = schematic[0][0] === '.'
                const heights = schematic.map(
                    (cylinder) => cylinder.filter((p) => p === '#').length - 1,
                )

                if (isLock) {
                    locks.add(heights)
                } else {
                    keys.add(heights)
                }
            })

        return { locks, keys }
    }

    get locks() {
        return this.input.locks
    }

    get keys() {
        return this.input.keys
    }

    public solveFirst(): unknown {
        const pairs = []

        for (const lock of this.locks) {
            for (const key of this.keys) {
                if (lock.every((num, i) => num + key[i] < 6)) {
                    pairs.push([lock, key])
                }
            }
        }

        return pairs.length
    }

    public solveSecond(): unknown {
        return null
    }

    private print(schematic: string[][]): void {
        process.stdout.write(schematic.map((line) => line.join('')).join('\n'))
    }
}
