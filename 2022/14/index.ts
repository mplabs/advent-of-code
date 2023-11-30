
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { inRange } from '@utils/numbers'

type Point = [x: number, y: number]

type Particle = Point & { resting?: boolean }

type State = {
  particles: Particle[]
  walls: Wall[]
  source: Point
  maxY: number
  done: boolean
}

class Wall {
  constructor(public from: Point, public to: Point) {}

  intersects([x, y]: Point) {
    return (
      (x === this.from[0] && (inRange(y, this.from[1], this.to[1]) || y === this.to[1])) ||
      (y === this.from[1] && (inRange(x, this.from[0], this.to[0]) || x === this.to[0]))
    )
  }
}

export default class Day14 extends AbstractPuzzle {
  static INITIAL_STATE = {
    particles: [],
    walls: [],
    source: <Point>[500, 0],
    maxY: 0,
    done: false,
  }

  state: State = Day14.INITIAL_STATE

  get input() {
    return this.rawInput
      .split('\n')
      .map((line) => line.split(' -> '))
  }

  private addWall(from: Point, to: Point) {
    this.state.walls.push(new Wall(from, to))
    this.state.maxY = Math.max(from[0], to[1], this.state.maxY)
  }

  private isAir([x, y]: Point) {
    return (
      this.state.particles.every(([u, v]) => !(u === x && v === y)) &&
      this.state.walls.every(w => w.intersects([x,y]))
    )
  }

  private next() {
    const { particles, walls, source, maxY, done } = this.state
    
    // Get falling sand
    const sandIndex = particles.findIndex(({ resting }) => !resting)

    // Part 2 condition
    const particleOnSource = particles.find(([x,y]) => x === source[0] && y === source[1])
    console.log({ sandIndex, particleOnSource, resting: !!particleOnSource?.resting })
    if (sandIndex === -1 && particleOnSource) {
      if (particleOnSource.resting) {
        this.state = { ...this.state, done: true }
        return
      }
      throw new Error(`Particle on source but moving should not have happened.`)
    }

    // When all sand is resting, generate new unit
    if (sandIndex === -1) {
      particles.push([...source])
      return
    }

    // Check if we are done
    if (particles[sandIndex][1] >= maxY) {
      this.state = { ...this.state, done: true }
      return
    }

    // Update position
    const [x, y] = particles[sandIndex]
    if (this.isAir([x, y + 1])) {
      particles[sandIndex] = [x, y + 1]
      return
    } else if (this.isAir([x - 1, y + 1])) {
      particles[sandIndex] = [x - 1, y + 1]
      return
    } else if (this.isAir([x + 1, y + 1])) {
      particles[sandIndex] = [x + 1, y + 1]
      return
    } else {
      particles[sandIndex].resting = true
    }

    this.state = { particles, walls, source, maxY, done }
  }

  public solveFirst(): number {
    this.state = Day14.INITIAL_STATE

    this.input
      .forEach((coordinates) => {
        for (let i = 1; i < coordinates.length; i++) {
          const from = <Point>coordinates[i - 1].split(',').map(Number)
          const to = <Point>coordinates[i].split(',').map(Number)
          this.addWall(from, to)
        }
        
      })

    while (!this.state.done) {
      this.next()
    }

    return this.state.particles.length - 1
  }

  public solveSecond(): number {
    this.state = Day14.INITIAL_STATE

    this.input
      .forEach((coordinates) => {
        for (let i = 1; i < coordinates.length; i++) {
          const from = <Point>coordinates[i - 1].split(',').map(Number)
          const to = <Point>coordinates[i].split(',').map(Number)
          this.addWall(from, to)
        }
      })

    this.addWall(
      [-Infinity, this.state.maxY + 2],
      [Infinity, this.state.maxY + 2]
    )

    while (!this.state.done) {
      this.next()
      process.stdout.write(`Particles: ${this.state.particles.length}...\r`)
    }

    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)

    return this.state.particles.length
  }
}
  