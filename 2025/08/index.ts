import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached, Memoized } from '@utils/utils'

export default class Day8 extends AbstractPuzzle {
    @Cached()
    get input() {
        return this.rawInput.split('\n').map((line) => line.split(',').map(Number))
    }

    public solveFirst(): unknown {
        let distances = new Map<[number[], number[]], number>()

        // Get all the distqnces
        this.input.forEach((v1, i) => {
            this.input.slice(i + 1, this.input.length).forEach((v2) => {
                distances.set([v1, v2], this.distance(v1, v2))
            })
        })

        // Sort by distance
        distances = this.sort(distances)

        // Form circuits
        const N = 1000 // or 10 for the example
        const unionFind = this.makeUnionFind(this.input)

        let used = 0
        for (const [[p1, p2]] of distances) {
            if (used >= N) break
            const id1 = `${JSON.stringify(p1)}`
            const id2 = `${JSON.stringify(p2)}`
            unionFind.union(id1, id2)
            used++
        }

        // Compute sizes of all circuits
        const componentSizes = new Map<string, number>()

        for (const p of this.input) {
            const root = unionFind.find(`${JSON.stringify(p)}`)
            componentSizes.set(root, (componentSizes.get(root) ?? 0) + 1)
        }

        // Sort sizes descending
        const sizes = Array.from(componentSizes.values()).sort((a, b) => b - a)

        // Multiply the three largest sizes
        const top3 = sizes.slice(0, 3)
        const result = top3.reduce((prod, s) => prod * s, 1)

        return result
    }

    public solveSecond(): unknown {
        let distances = new Map<[number[], number[]], number>()

        // Get all the distqnces
        this.input.forEach((v1, i) => {
            this.input.slice(i + 1).forEach((v2) => {
                distances.set([v1, v2], this.distance(v1, v2))
            })
        })

        // Sort by distance
        distances = this.sort(distances)

        // Form circuits
        const unionFind = this.makeUnionFind(this.input)

        // We start with all components unconnected
        let componentsLeft = this.input.length

        // This will store the last junction boxes that close the circuit
        let lastPair: [number[], number[]] | null = null

        for (const [pair] of distances) {
            const [p1, p2] = pair

            const merged = unionFind.union(`${JSON.stringify(p1)}`, `${JSON.stringify(p2)}`)

            // Only reduce component count when union actually merges two circuits
            if (merged) {
                componentsLeft--
                lastPair = [p1, p2]

                if (componentsLeft === 1) {
                    // done
                    break
                }
            }
        }

        if (!lastPair) {
            throw new Error('Could not connect all junction boxes into a single circuit.')
        }

        const [lastA, lastB] = lastPair
        const x1 = lastA[0]
        const x2 = lastB[0]

        return x1 * x2
    }

    @Memoized()
    private distance(v1: number[], v2: number[]): number {
        const dx = v1[0] - v2[0]
        const dy = v1[1] - v2[1]
        const dz = v1[2] - v2[2]
        return dx * dx + dy * dy + dz * dz
    }

    private sort<K, V extends number>(map: Map<K, V>) {
        return new Map([...map.entries()].sort((a, b) => a[1] - b[1]))
    }

    private makeUnionFind(points: number[][]) {
        const parent = new Map<string, string>()
        const size = new Map<string, number>()

        for (const p of points) {
            parent.set(`${JSON.stringify(p)}`, `${JSON.stringify(p)}`)
            size.set(`${JSON.stringify(p)}`, 1)
        }

        const find = (x: string): string => {
            const px = parent.get(x)

            if (px === undefined) {
                throw new Error(`Cannot find ${x}`)
            }

            if (px !== x) {
                const root = find(px)
                parent.set(x, root)
                return root
            }

            return x
        }

        const union = (v1: string, v2: string): boolean => {
            let rv1 = find(v1)
            let rv2 = find(v2)
            if (rv1 === rv2) {
                return false
            }

            let sv1 = size.get(rv1)!
            let sv2 = size.get(rv2)!

            // union by size
            if (sv1 < sv2) {
                ;[rv1, rv2] = [rv2, rv1]
            }

            parent.set(rv2, rv1)
            size.set(rv1, sv1 + sv2)
            size.delete(rv2)

            return true
        }

        return { parent, size, find, union }
    }
}
