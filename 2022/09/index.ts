
import AbstractPuzzle from '@utils/AbstractPuzzle'

const distance = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1]]

export default class Day9 extends AbstractPuzzle {
  get input(): string {
    return this.rawInput
  }

  private mapDirections(line: string): [[number, number], number] {
    const [direction, steps] = line.split(' ')
    switch (direction) {
      case 'R':
        return [[1, 0], parseInt(steps)]
      case 'L':
        return [[-1, 0], parseInt(steps)]
      case 'U':
        return [[0, 1], parseInt(steps)]
      case 'D':
        return [[0, -1], parseInt(steps)]
      default:
        throw new Error(`Unknown direction ${direction}`)
    }
  }

  public solveFirst(): number {
    const visited = new Set<string>()
    let head = [0, 0],
      tail = [0, 0]

    this.input
      .split('\n')
      .map(this.mapDirections)
      .forEach(([direction, steps]) => {
        for (let i = 0; i < steps; i++) {
          head[0] += direction[0]
          head[1] += direction[1]

          const [deltaX, deltaY] = distance(head, tail)

          if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) {
            visited.add(tail.join(','))
            continue
          }

          if (Math.abs(deltaX) > 0) {
            tail[0] += deltaX < 0 ? -1 : 1
          }

          if (Math.abs(deltaY) > 0) {
            tail[1] += deltaY < 0 ? -1 : 1
          }

          visited.add(tail.join(','))
        }
      })

    return visited.size
  }

  public solveSecond(): number {
    const visited = new Set<string>()
    const rope = new Array(10).fill([0, 0])

    this.input
      .split('\n')
      .map(this.mapDirections)
      .forEach(([direction, steps]) => {
        for (let step = 0; step < steps; step++) {
          rope[0] = [rope[0][0] + direction[0], rope[0][1] + direction[1]]

          for (let i = 1; i < rope.length; i++) {
            const [dx, dy] = distance(rope[i - 1], rope[i])

            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
              break
            }

            // JavaScript assigns nested arrays by reference
            // create shallow copies to circumvent this
            rope[i] = [
              Math.abs(dx) > 0 ? rope[i][0] + dx / Math.abs(dx) : rope[i][0],
              Math.abs(dy) > 0 ? rope[i][1] + dy / Math.abs(dy) : rope[i][1],
            ]
          }
          visited.add(`${rope[9][0]},${rope[9][1]}`)
        }
      })

    return visited.size
  }
}
  