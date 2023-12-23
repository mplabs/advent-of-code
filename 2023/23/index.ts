import { PriorityQueue } from '@datastructures-js/priority-queue'
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day23 extends AbstractPuzzle {
  _input?: string[][]
  get input(): string[][] {
    if (!this._input) {
      this._input = this.rawInput.split('\n').map((line) => line.split(''))
    }

    return this._input
  }

  public solveFirst(): unknown {
    const startingPosition = [0, 1]
    const endingPosition = [this.input.length - 1, this.input[0].length - 2]

    // Make a max priority queue
    const pqueue = PriorityQueue.fromArray([[...startingPosition, -1, 0]], (a, b) => a[3] + b[3])

    // Remember positions we have seen, so we don't go back
    const seen = new Set<string>()

    let r: number, c: number, d: number, s: number
    while (!pqueue.isEmpty()) {
      [r, c, d, s] = pqueue.pop()

      if (r === endingPosition[0] && c === endingPosition[1]) {
        continue
      }

      // Skip if we have seen this position before
      const key = `${r},${c}`
      if (seen.has(key)) {
        continue
      }

      seen.add(key)

      const neighbors: [r: number, c: number][] = [
        [r - 1, c], // North
        [r + 1, c], // South
        [r, c - 1], // West
        [r, c + 1], // East
      ]

      for (let dir = 0; dir < neighbors.length; dir++) {
        // Check if we can go in this direction
        if (!(d === -1 || dir === d)) {
          continue
        }

        // Get the next position
        const [nr, nc] = neighbors[dir]

        // Check bounds
        if (nr < 0 || nr >= this.input.length || nc < 0 || nc >= this.input[0].length) {
          continue
        }

        // If the next position is path, add it to the queue.
        if (this.input[nr][nc] === '.') {
          pqueue.enqueue([nr, nc, -1, s + 1])
        }

        // If the next position is a slope, check if we can go down.
        if (
          (this.input[nr][nc] === '>' && dir === 3) ||
          (this.input[nr][nc] === '<' && dir === 2) ||
          (this.input[nr][nc] === 'v' && dir === 1) ||
          (this.input[nr][nc] === '^' && dir === 0)
        ) {
          pqueue.enqueue([nr, nc, dir, s + 1])
        }
      }
    }

    // No solution found
    return s
  }

  public solveSecond(): unknown {
    return null
  }
}
