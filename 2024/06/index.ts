
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day6 extends AbstractPuzzle {
  width: number
  height: number
  map = new Set<string>()
  trail = new Set<string>()
  startingPosition = [0,0]

  constructor(input: string) {
    super(input)

    const lines = this.rawInput.split('\n')
    this.height = lines.length
    this.width = lines[0].length

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const char = lines[y].charAt(x)

        switch (char) {
          case '.':
            break

          case '#':
            this.map.add(`${x},${y}`)
            break
          
          case '^':
            this.startingPosition = [x,y]
            this.trail.add(`${x},${y}`)
            break

          default:
            throw new Error(`Unexpected character on map: '${char}'`)
        }
      }
    }
  }

  public solveFirst(): unknown {
    let [x, y] = this.startingPosition
    let dir = 0
    do {
      switch (dir) {
        case 0: // Up
          y--
          break

        case 1: // Right
          x++
          break

        case 2: // Down
          y++
          break

        case 3: // Left
          x--
          break

        default:
          throw new Error(`How did we get here?`)
      }
    } while (this.checkBounds(x, y))

    return null
  }

  public solveSecond(): unknown {
    return null
  }

  private checkBounds(x: number, y: number) {
    return x > 0 && x < this.width && y > 0 && y < this.height
  }
}
  