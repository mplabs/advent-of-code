import AbstractPuzzle from '@utils/AbstractPuzzle'
import { PriorityQueue } from '@datastructures-js/priority-queue'
import { eq } from '@utils/lang'

export default class Day17 extends AbstractPuzzle {
  _input?: number[][]
  get input(): number[][] {
    if (!this._input) {
      this._input = this.rawInput.split('\n').map((line) => line.split('').map(Number))
    }

    return this._input
  }

  grid([x, y]: [number, number]): number {
    return this.input[y][x]
  }

  public solveFirst(): unknown {
    const seen = new Set<string>()
    const pqueue = PriorityQueue.fromArray<number[]>(
      [[0, 0, 0, 0, 0, 0]], // HeatLoss, startingX, startingY, movingX, movingY, numberOfSteps
      ([hla], [hlb]) => hla - hlb // Return minimun heat loss
    )

    while (!pqueue.isEmpty()) {
      const [hl, x, y, dx, dy, steps] = pqueue.pop()

      // Check if we are done
      if (eq([x, y], [this.input[0].length - 1, this.input.length - 1])) {
        return hl
      }

      // Check if we've seen this before
      const key = `${x},${y},${dx},${dy},${steps}`
      if (seen.has(key)) {
        continue
      }

      // Add to seen
      seen.add(key)

      // Check if we can move straight
      if (steps < 3 && !eq([dx, dy], [0, 0])) {
        // Next position
        const nx = x + dx
        const ny = y + dy

        // Check if next position is in the grid
        if (0 <= nx && nx < this.input[0].length && 0 <= ny && ny < this.input.length) {
          // Add to queue
          pqueue.push([hl + this.input[ny][nx], nx, ny, dx, dy, steps + 1])
        }
      }

      // Check if we can turn
      for (const [ndx, ndy] of [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ]) {
        // Check if we are changing direction and not turning back
        if (!eq([ndx, ndy], [dx, dy]) && !eq([ndx, ndy], [-dx, -dy])) {
          // Next position
          const nx = x + ndx
          const ny = y + ndy

          if (0 <= nx && nx < this.input[0].length && 0 <= ny && ny < this.input.length) {
            // Add to queue
            pqueue.push([hl + this.input[ny][nx], nx, ny, ndx, ndy, 1])
          }
        }
      }
    }

    // No solution found
    return null
  }

  public solveSecond(): unknown {
    const seen = new Set<string>()
    const pqueue = PriorityQueue.fromArray<number[]>(
      [[0, 0, 0, 0, 0, 0]], // HeatLoss, startingX, startingY, movingX, movingY, numberOfSteps
      ([hla], [hlb]) => hla - hlb // Return minimun heat loss
    )

    while (!pqueue.isEmpty()) {
      const [hl, x, y, dx, dy, steps] = pqueue.pop()

      // Check if we are done
      if (eq([x, y], [this.input[0].length - 1, this.input.length - 1]) && steps >= 4) {
        return hl
      }

      // Check if we've seen this before
      const key = `${x},${y},${dx},${dy},${steps}`
      if (seen.has(key)) {
        continue
      }

      // Add to seen
      seen.add(key)

      // Check if we can move straight
      if (steps < 10 && !eq([dx, dy], [0, 0])) {
        // Next position
        const nx = x + dx
        const ny = y + dy

        // Check if next position is in the grid
        if (0 <= nx && nx < this.input[0].length && 0 <= ny && ny < this.input.length) {
          // Add to queue
          pqueue.push([hl + this.input[ny][nx], nx, ny, dx, dy, steps + 1])
        }
      }

      // Check if we can turn
      if (steps >= 4 || eq([dx, dy], [0, 0])) {
        for (const [ndx, ndy] of [
          [1, 0],
          [0, 1],
          [-1, 0],
          [0, -1],
        ]) {
          // Check if we are changing direction and not turning back
          if (!eq([ndx, ndy], [dx, dy]) && !eq([ndx, ndy], [-dx, -dy])) {
            // Next position
            const nx = x + ndx
            const ny = y + ndy

            if (0 <= nx && nx < this.input[0].length && 0 <= ny && ny < this.input.length) {
              // Add to queue
              pqueue.push([hl + this.input[ny][nx], nx, ny, ndx, ndy, 1])
            }
          }
        }
      }
    }

    // No solution found
    return null
  }
}
