
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Graph } from '@utils/graph'
import { stdout } from 'node:process'

export default class Day18 extends AbstractPuzzle {
    width = 71
    height = 71

    public solveFirst(): unknown {
        const start = `0,0`
        const end = `70,70`
        const positions = new Set<string>(this.rawInput.split('\n').slice(0, 1024))
        const graph = new Graph()

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                graph.addEdge(
                    `${x},${y}`,
                    ...this.getNeighbors(`${x},${y}`).filter(coords => !positions.has(coords))
                )
            }
        }

        return graph.shortestPath(start, end)?.length! - 1
    }

    public solveSecond(): unknown {
        const start = `0,0`
        const end = `70,70`
        const lines = this.rawInput.split('\n')
        const position = new Set<string>(lines.slice(0, 1024))
        const graph = new Graph()

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                graph.addEdge(
                    `${x},${y}`,
                    ...this.getNeighbors(`${x},${y}`).filter(coords => !position.has(coords))
                )
            }
        }

        let count = 1024
        while(count < lines.length && graph.shortestPath(start, end)) {
            graph.removeNode(lines[++count])
        }

        return lines[count]
    }

    private getNeighbors(coords: string): string[] {
        const [x, y] = coords.split(',').map(Number)
        const neighbors = []
        
        // Top
        if (y > 0) {
            neighbors.push(`${x},${y - 1}`)
        }

        // Bottom
        if (y < this.height - 1) {
            neighbors.push(`${x},${y + 1}`)
        }

        // Left
        if (x > 0) {
            neighbors.push(`${x - 1},${y}`)
        }

        // Right
        if (x < this.width - 1) {
            neighbors.push(`${x + 1},${y}`)
        }

        return neighbors
    }

    private print(positions: Set<string>): void {
        let grid = ''
        for (let y = 0; y < this.height; y++) {
            let row = ''
            for (let x = 0; x < this.width; x++) {
                row += positions.has(`${x},${y}`) ? '#' : '.'
            }
            grid += row + '\n'
        }

        stdout.write(`\n\n${grid}\n\n`)
    }
}
