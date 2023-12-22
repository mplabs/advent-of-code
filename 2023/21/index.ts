import { Queue } from '@datastructures-js/queue'
import AbstractPuzzle from '@utils/AbstractPuzzle'
import assert from 'assert'

export default class Day21 extends AbstractPuzzle {
  _input?: string[][]
  get input() {
    if (!this._input) {
      this._input = this.rawInput.split('\n').map((line) => line.split(''))
    }
    return this._input
  }

  get maxRow() {
    return this.input.length - 1
  }

  get maxCol() {
    return this.input[0].length - 1
  }

  _startingPoint?: [number, number]
  get startingPoint() {
    if (!this._startingPoint) {
      this._startingPoint = this.findStartingPoint()
    }

    return this._startingPoint
  }

  findStartingPoint(): [number, number] {
    for (let r = 0; r <= this.maxRow; r++) {
      for (let c = 0; c <= this.maxCol; c++) {
        if (this.input[r][c] === 'S') {
          return [r, c]
        }
      }
    }

    throw new Error('No starting point found')
  }

  fill(sr: number, sc: number, steps: number): number {
    // Create a queue of all the possible paths
    const queue = Queue.fromArray<[number, number, number]>([[sr, sc, steps]])

    // Answer set
    const answer: Set<string> = new Set()

    // Remember plots we have seen
    const seen: Set<string> = new Set()

    while (!queue.isEmpty()) {
      const [r, c, s] = queue.pop()

      // If the number of steps is even, we can always come back here by going back and forth
      if (s % 2 === 0) {
        answer.add(`${r},${c}`)
      }

      // If the remaining steps are 0, we can't go any further
      if (s === 0) {
        continue
      }

      for (const [nr, nc] of [
        [r + 1, c],
        [r - 1, c],
        [r, c + 1],
        [r, c - 1],
      ]) {
        // Check if we are out of bounds
        if (nr < 0 || nr > this.maxRow || nc < 0 || nc > this.maxCol) {
          continue
        }

        // Check if we have already seen this plot
        if (seen.has(`${nr},${nc}`)) {
          continue
        }

        if (this.input[nr][nc] === '#') {
          continue
        }

        queue.enqueue([nr, nc, s - 1])
        seen.add(`${nr},${nc}`)
      }
    }

    return answer.size
  }

  public solveFirst(): unknown {
    // Find the starting position
    const startingPoint = this.findStartingPoint()

    // The elf has to take 64 steps
    const steps = 64

    return this.fill(startingPoint[0], startingPoint[1], steps)
  }

  public solveSecond(): unknown {
    // I needed a lot of help with this one:
    // https://www.youtube.com/watch?v=9UOMZSL0JTg

    // Find the starting position
    const startingPoint = this.findStartingPoint()

    // The elf has to take 26,501,365 steps
    const steps = 26501365

    // We make some assumtions about the input:
    // - The edges of every instance of the map are empty
    // - The row and column containing the starting point are empty
    // - The starting point is in the middle of the map
    // - The map is of odd with and height
    // - The map is square
    // That means:
    // - We cannot reacht the starting point again in the next grid,
    //   but we can reach it in the next grid further.

    assert(this.maxCol === this.maxRow, 'The map is square')
    const size = this.maxCol + 1

    assert(
      startingPoint[0] === Math.floor(size / 2) && startingPoint[1] === Math.floor(size / 2),
      'The starting point is in the middle of the map'
    )

    assert(
      steps % size === Math.floor(size / 2),
      'After taking all the steps we pass a complete number of maps and a half, so we reach exactly the edge of a map'
    )

    // How many maps can be reached, excluding the starting map?
    const mapCount = Math.floor(steps / size) - 1

    // The number of maps reachable
    const oddNumberOfGrids = Math.pow(Math.ceil(mapCount), 2)
    const evenNumberOfGrids = Math.pow(Math.floor(mapCount + 1), 2)

    // How many points are reached per map?
    // We choose 'size * 2' because this is enough to get us from one corner of the map to the other.
    const oddPoints = this.fill(startingPoint[0], startingPoint[1], size * 2 + 1)
    const evenPoints = this.fill(startingPoint[0], startingPoint[1], size * 2)

    // We still need to handle the edge maps that cannot be fully reached
    const topPoints = this.fill(
      size - 1, // Bottom row
      startingPoint[1], // In the middle
      size - 1 // Just enough to cross the map entirely
    )
    const bottomPoints = this.fill(
      0, // Top row
      startingPoint[1], // In the middle
      size - 1 // Just enough to cross the map entirely
    )
    const leftPoints = this.fill(
      startingPoint[0], // In the middle
      0, // Left column
      size - 1 // Just enough to cross the map entirely
    )
    const rightPoints = this.fill(
      startingPoint[0], // In the middle
      size - 1, // Right column
      size - 1 // Just enough to cross the map entirely
    )

    const smallTR = this.fill(
      size - 1, // Bottom row
      0, // Left column
      Math.floor(size / 2) - 1
    )

    const smallTL = this.fill(
      size - 1, // Bottom row
      size - 1, // Right column
      Math.floor(size / 2) - 1
    )

    const smallBR = this.fill(
      0, // Top row
      0, // Left column
      Math.floor(size / 2) - 1
    )

    const smallBL = this.fill(
      0, // Top row
      size - 1, // Right column
      Math.floor(size / 2) - 1
    )

    const largeTR = this.fill(
      size - 1, // Bottom row
      0, // Left column
      Math.floor(size * 3 / 2) - 1
    )

    const largeTL = this.fill(
      size - 1, // Bottom row
      size - 1, // Right column
      Math.floor(size * 3 / 2) - 1
    )

    const largeBR = this.fill(
      0, // Top row
      0, // Left column
      Math.floor(size * 3 / 2) - 1
    )

    const largeBL = this.fill(
      0, // Top row
      size - 1, // Right column
      Math.floor(size * 3 / 2) - 1
    )

    return (
      oddPoints * oddNumberOfGrids + // Complete odd maps
      evenPoints * evenNumberOfGrids + // Complete even maps
      topPoints + leftPoints + rightPoints + bottomPoints + // TLRB Edges
      (mapCount + 1) * (smallTR + smallTL + smallBR + smallBL) + // Small Segments
      mapCount * (largeTR + largeTL + largeBR + largeBL) // Large Segments
    )
  }
}
