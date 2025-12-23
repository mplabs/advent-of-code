import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Graph } from '@utils/graph'
import { sum } from '@utils/numbers'
import { Cached } from '@utils/utils'

export default class Day6 extends AbstractPuzzle {
    @Cached()
    get input() {
        return new Map(
            this.rawInput
                .trim()
                .split('\n')
                .map((line) => line.split(')') as [string, string])
                .map(([a, b]) => [b, a]),
        )
    }

    public solveFirst(): unknown {
        return this.input.keys().reduce((result, obj) => result + this.orbits(obj).length, 0)
    }

    public solveSecond(): unknown {
        const you2com = new Set(this.orbits('YOU'))
        const san2com = new Set(this.orbits('SAN'))
        const intersection = [...you2com.intersection(san2com)][0]

        return this.orbits('YOU', intersection).length + this.orbits('SAN', intersection).length - 2
    }

    private orbits(from: string, to = 'COM'): string[] {
        if (from === to) {
            return []
        }

        if (!this.input.has(from)) {
            throw new Error(`Unknoen object ${from}`)
        }

        return [from, ...this.orbits(this.input.get(from)!, to)]
    }
}
