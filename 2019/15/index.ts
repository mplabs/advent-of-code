import { Computer } from '2019/shared/computer'
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Graph } from '@utils/graph'

type Node = { x: number; y: number; cpu: Computer; dist: number }

const delta: { [k: number]: [number, number] } = {
    1: [0, -1],
    2: [0, 1],
    3: [-1, 0],
    4: [1, 0],
}
const key = (x: number, y: number) => `${x},${y}`

export default class Day15 extends AbstractPuzzle {
    get input() {
        return this.rawInput.trim().split(',').map(Number)
    }

    public solveFirst(): unknown {
        const startCpu = new Computer(this.input)
        const queue: Node[] = [{ x: 0, y: 0, cpu: startCpu, dist: 0 }]
        const visited = new Set<string>([`0,0`])

        while (queue.length > 0) {
            const cur = queue.shift()!
            const k = key(cur.x, cur.y)

            for (const dir of [1, 2, 3, 4]) {
                const [dx, dy] = delta[dir]!
                const nx = cur.x + dx
                const ny = cur.y + dy
                const nk = key(nx, ny)

                if (visited.has(nk)) {
                    continue
                }

                // Clone CPU state for exploring this move
                const nextCpu = cur.cpu.clone()
                nextCpu.appendInput(dir)
                const status = nextCpu.runUntilOutput()

                if (status === 0) {
                    // wall
                    visited.add(nk)
                    continue
                }

                if (status === 2) {
                    // Found oxygen: BFS distance is the answer
                    return cur.dist + 1
                }

                visited.add(nk)
                queue.push({ x: nx, y: ny, cpu: nextCpu, dist: cur.dist + 1 })
            }
        }
    }

    public solveSecond(): unknown {
        const startCpu = new Computer(this.input)
        const queue: Node[] = [{ x: 0, y: 0, cpu: startCpu, dist: 0 }]
        const visited = new Set<string>([`0,0`])
        const graph = new Graph()
        let oxygenKey: string | null = null

        while (queue.length > 0) {
            const cur = queue.shift()!
            const k = key(cur.x, cur.y)

            for (const dir of [1, 2, 3, 4]) {
                const [dx, dy] = delta[dir]!
                const nx = cur.x + dx
                const ny = cur.y + dy
                const nk = key(nx, ny)

                if (visited.has(nk)) {
                    continue
                }

                // Clone CPU state for exploring this move
                const nextCpu = cur.cpu.clone()
                nextCpu.appendInput(dir)
                const status = nextCpu.runUntilOutput()

                if (status === 0) {
                    // wall
                    visited.add(nk)
                    continue
                }

                // moved: open tile
                graph.addEdge(k, nk)
                graph.addEdge(nk, k)

                if (status === 2) {
                    oxygenKey = nk
                }

                visited.add(nk)
                queue.push({ x: nx, y: ny, cpu: nextCpu, dist: cur.dist + 1 })
            }
        }

        return oxygenKey ? graph.maxDistanceFrom(oxygenKey) : null

    }
}
