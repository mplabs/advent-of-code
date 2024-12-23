import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Cached } from '@utils/utils'

class Network {
    neighbors: Map<string, string[]>

    constructor() {
        this.neighbors = new Map()
    }

    addEdge(a: string, b: string) {
        if (!this.neighbors.has(a)) {
            this.neighbors.set(a, [])
        }
        if (!this.neighbors.has(b)) {
            this.neighbors.set(b, [])
        }
        this.neighbors.get(a)?.push(b)
        this.neighbors.get(b)?.push(a)
    }

    bronKerbosch(
        R: Set<string>, // Current clique
        P: Set<string>, // Candidate nodes
        X: Set<string>, // Already processed
        cliques: Set<string>[]
    ): void {
        if (P.size === 0 && X.size === 0) {
            cliques.push(new Set(R)) // Found a maximal clique
            return
        }

        for (const node of P) {
            const neighbors = new Set(this.neighbors.get(node) || [])

            // Recurse with node added to R, and neighbors updated
            this.bronKerbosch(
                new Set(R).add(node),
                new Set([...P].filter(n => neighbors.has(n))),
                new Set([...X].filter(n => neighbors.has(n))),
                cliques
            )

            P.delete(node)
            X.add(node)
        }
    }

    bronKerbosch2(
        R: Set<string>, // Current clique
        P: Set<string>, // Candidate nodes
        X: Set<string>, // Already processed
        cliques: Set<string>[]
    ): void {
        if (P.size === 0 && X.size === 0) {
            // R is a maximal clique
            cliques.push(new Set(R))
            return
        }

        // Choose a pivot vertex 'u' from P ⋃ X
        const unionPX = P.union(X)
        let pivot: string | null = null
        let maxNeighbors = -1

        for (const vertex of unionPX) {
            const neighbors = new Set(this.neighbors.get(vertex) || [])
            if (neighbors.size > maxNeighbors) {
                pivot = vertex
                maxNeighbors = neighbors.size
            }
        }

        const pivotNeighbors = pivot
            ? new Set(this.neighbors.get(pivot)) || new Set()
            : new Set()

        // Iterate through vertices in P \ N(u)
        for (const v of P) {
            if (pivotNeighbors.has(v)) {
                continue
            }

            const neighbors = new Set(this.neighbors.get(v) || [])
            const newR = new Set(R).add(v)
            const newP = new Set([...P].filter(n => neighbors.has(n)))
            const newX = new Set([...X].filter(n => neighbors.has(n)))

            this.bronKerbosch2(newR, newP, newX, cliques)

            P.delete(v)
            X.add(v)
        }
    }

    findCluster(): string[][] {
        const clusters: string[][] = []
        const nodes = [...this.neighbors.keys()]

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                for (let k = j + 1; k < nodes.length; k++) {
                    const subset = [nodes[i], nodes[j], nodes[k]]
                    if (this.isValidCluster(subset)) {
                        clusters.push(subset)
                    }
                }
            }
        }

        return clusters
    }

    findLargestClique(): string[] {
        const cliques: Set<string>[] = []
        const R = new Set<string>()
        const P = new Set<string>(this.neighbors.keys())
        const X = new Set<string>()

        this.bronKerbosch2(R, P, X, cliques)

        return [...cliques.sort((a, b) => b.size - a.size)[0]]
    }

    private isValidCluster(nodes: string[]): boolean {
        for (const node of nodes) {
            const outgoingNeighbors = this.neighbors.get(node)
            const neighborsWithinCluster = outgoingNeighbors?.filter((neighbor) =>
                nodes.includes(neighbor),
            )

            if (!neighborsWithinCluster?.length || neighborsWithinCluster?.length < 2) {
                return false
            }
        }

        return true
    }
}

export default class Day23 extends AbstractPuzzle {
    @Cached()
    get input() {
        const network = new Network()
        this.rawInput
            .split('\n')
            .map((line) => line.split('-'))
            .forEach(([a, b]) => network.addEdge(a, b))

        return network
    }

    public solveFirst(): unknown {
        return this.input
            .findCluster()
            .filter((nodes) => nodes.some((node) => node.startsWith('t'))).length
    }

    public solveSecond(): unknown {
        return this.input
            .findLargestClique()
            .sort((a, b) => a.localeCompare(b))
            .join(',')
    }
}
