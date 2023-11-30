
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { Graph } from '@utils/graph'

type Coords = [x: number, y: number]

export default class Day12 extends AbstractPuzzle {
  COLUMNS: number
  chars: string
  graph: Graph = new Graph()
  end: Coords
  start: Coords

  get input(): string {
    return this.rawInput
  }

  constructor(input: string) {
    super(input)

    this.chars = this.input.replace(/(\n\r?)/g, '') // Get one big continuous string of chars
    this.COLUMNS = this.input.split('\n')[0].length // Number of columns is the length of the first line

    // Position of the start marker
    this.start = [
      this.chars.indexOf('S') % this.COLUMNS,
      Math.floor(this.chars.indexOf('S') / this.COLUMNS),
    ]

    // Position of the end marker
    this.end = [
      this.chars.indexOf('E') % this.COLUMNS,
      Math.floor(this.chars.indexOf('E') / this.COLUMNS),
    ]

    // Swap in values for start and end
    this.chars = this.chars.replace(/S/g, 'a').replace(/E/g, 'z')

    // Build graph
    for (let y = 0; y < Math.floor(this.chars.length / this.COLUMNS); y++) {
      for (let x = 0; x < this.COLUMNS; x++) {
        this.graph.addEdge(
          `${x},${y}`,
          ...this.getNeighbours([x, y])
            .filter(
              (coords) => this.charCodeAt(coords) - this.charCodeAt([x, y]) <= 1
            )
            .map(this.stringFrom)
        )
      }
    }
  }

  // Get the char at a given position
  private charAt = ([x, y]: Coords) => this.chars[y * this.COLUMNS + x]

  // Get the char code at a given position
  private charCodeAt = ([x, y]: Coords) => this.charAt([x, y]).charCodeAt(0)

  // Get the top, left, bottom, right neighbour coordinates of a given position
  private getNeighbours = ([x, y]: Coords): Coords[] =>
    [
      y - 1 >= 0 ? [x, y - 1] : [-1, -1], // top
      x - 1 >= 0 ? [x - 1, y] : [-1, -1], // left
      y + 1 < Math.floor(this.chars.length / this.COLUMNS)
        ? [x, y + 1]
        : [-1, -1], // bottom
      x + 1 < this.COLUMNS ? [x + 1, y] : [-1, -1], // right
    ].filter(([x, y]) => x > -1 && y > -1) as Coords[]

  // Convert a coordinate pair to a string for keys in the graph
  private stringFrom([x, y]: Coords): string {
    return `${x},${y}`
  }

  public solveFirst(): number {
    const shortestPath =
      this.graph.shortestPath(
        this.stringFrom(this.start),
        this.stringFrom(this.end)
      ) || []

    return shortestPath.length - 1
  }

  public solveSecond(): number {
    // Get all coordinates of 'a' characters
    const as = Array.from(this.chars.matchAll(/[a]/g)).map(({ index }) => [
      (index as number) % this.COLUMNS,
      Math.floor((index as number) / this.COLUMNS),
    ])

    return (
      as
        .map(
          (a) =>
            this.graph.shortestPath(
              this.stringFrom(a as Coords),
              this.stringFrom(this.end)
            )?.length || 0
        )
        .filter(Boolean)
        .sort((a, b) => a - b)[0] - 1
    )
  }
}
  