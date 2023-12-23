import AbstractPuzzle from '@utils/AbstractPuzzle'
import { eq } from '@utils/lang'

export default class Day23 extends AbstractPuzzle {
  _input?: string[][]
  get input(): string[][] {
    if (!this._input) {
      this._input = this.rawInput.split('\n').map((line) => line.split(''))
    }

    return this._input
  }

  public solveFirst(): unknown {
    // Get the starting and ending positions
    const start = [0, 1]
    const end = [this.input.length - 1, this.input[0].length - 2]

    // All the possible positions
    const points: number[][] = [start, end]

    for (let r = 0; r < this.input.length; r++) {
      for (let c = 0; c < this.input[r].length; c++) {
        // Skip if it's a forest
        if (this.input[r][c] === '#') {
          continue
        }

        let neighbors = 0
        for (const [nr, nc] of [
          [r - 1, c],
          [r + 1, c],
          [r, c - 1],
          [r, c + 1],
        ]) {
          // Check for bounds and if it's a forest
          if (
            0 <= nr &&
            nr < this.input.length &&
            0 <= nc &&
            nc < this.input[r].length &&
            this.input[nr][nc] !== '#'
          ) {
            neighbors++
          }
          if (neighbors >= 3) {
            points.push([r, c])
          }
        }
      }
    }

    const graph: Record<string, Record<string, number>> = {}
    for (let pt of points) {
      graph[JSON.stringify(pt)] = {}
    }

    // prettier-ignore
    const dirs: Record<string, number[][]> = {
      '^': [[-1, 0]],
      'v': [[1, 0]],
      '<': [[0, -1]],
      '>': [[0, 1]],
      '.': [[-1, 0], [1, 0], [0, -1], [0, 1]],
    }

    for (const [sr, sc] of points) {
      const stack: [n: number, r: number, c: number][] = [[0, sr, sc]]
      const seen = new Set([JSON.stringify([sr, sc])])

      while (stack.length > 0) {
        const [n, r, c] = stack.pop()!

        if (n !== 0 && points.some((pt) => pt[0] === r && pt[1] === c)) {
          graph[JSON.stringify([sr, sc])][JSON.stringify([r, c])] = n
          continue
        }

        for (const [dr, dc] of dirs[this.input[r][c]]) {
          const nr = r + dr
          const nc = c + dc
          // prettier-ignore
          if (
            nr >= 0 && nr < this.input.length && nc >= 0 && nc < this.input[0].length &&
            this.input[nr][nc] !== "#" &&
            !seen.has(JSON.stringify([nr, nc]))
          ) {
            stack.push([n + 1, nr, nc])
            seen.add(JSON.stringify([nr, nc]))
          }
        }
      }
    }

    const seen = new Set<string>()
    const dfs = (pt: number[]): number => {
      if (eq(pt, end)) {
        return 0
      }

      let m = -Infinity

      seen.add(JSON.stringify(pt))
      const nodes = graph[JSON.stringify(pt)]
      for (const nx in graph[JSON.stringify(pt)]) {
        if (!seen.has(nx)) {
          m = Math.max(m, dfs(JSON.parse(nx)) + graph[JSON.stringify(pt)][nx])
        }
      }
      seen.delete(JSON.stringify(pt))

      return m
    }

    return dfs(start)
  }

  public solveSecond(): unknown {
     // Start and end are still in the same place
    const start = [0, 1]
    const end = [this.input.length - 1, this.input[0].length - 2]

    // All the possible positions
    const points: number[][] = [start, end]

    for (let r = 0; r < this.input.length; r++) {
      for (let c = 0; c < this.input[r].length; c++) {
        // Skip if it's a forest
        if (this.input[r][c] === '#') {
          continue
        }
        
        let neighbors = 0
        for (const [nr, nc] of [
          [r - 1, c],
          [r + 1, c],
          [r, c - 1],
          [r, c + 1],
        ]) {
          // Check for bounds and if it's a forest
          if (
            0 <= nr &&
            nr < this.input.length &&
            0 <= nc &&
            nc < this.input[r].length &&
            this.input[nr][nc] !== '#'
          ) {
            neighbors++
          }
          if (neighbors >= 3) {
            points.push([r, c])
          }
        }
      }
    }

    const graph: Record<string, Record<string, number>> = {}
    for (let pt of points) {
      graph[JSON.stringify(pt)] = {}
    }

    for (const [sr, sc] of points) {
      const stack: [n: number, r: number, c: number][] = [[0, sr, sc]]
      const seen = new Set([JSON.stringify([sr, sc])])

      while (stack.length > 0) {
        const [n, r, c] = stack.pop()!

        if (n !== 0 && points.some((pt) => pt[0] === r && pt[1] === c)) {
          graph[JSON.stringify([sr, sc])][JSON.stringify([r, c])] = n
          continue
        }

        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nr = r + dr
          const nc = c + dc
          // prettier-ignore
          if (
            nr >= 0 && nr < this.input.length && nc >= 0 && nc < this.input[0].length &&
            this.input[nr][nc] !== "#" &&
            !seen.has(JSON.stringify([nr, nc]))
          ) {
            stack.push([n + 1, nr, nc])
            seen.add(JSON.stringify([nr, nc]))
          }
        }
      }
    }

    const seen = new Set<string>()
    const dfs = (pt: number[]): number => {
      if (eq(pt, end)) {
        return 0
      }

      let m = -Infinity

      seen.add(JSON.stringify(pt))
      const nodes = graph[JSON.stringify(pt)]
      for (const nx in graph[JSON.stringify(pt)]) {
        if (!seen.has(nx)) {
          m = Math.max(m, dfs(JSON.parse(nx)) + graph[JSON.stringify(pt)][nx])
        }
      }
      seen.delete(JSON.stringify(pt))

      return m
    }

    return dfs(start)
  }
}
