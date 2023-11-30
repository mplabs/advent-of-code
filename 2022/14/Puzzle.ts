import { inRange } from '@utils/number'
import { Puzzle } from '@utils/puzzle'

interface Wall {
  from: Point
  to: Point
}

interface State {
  particles: Particle[]
  walls: Wall[]
  source: Point
  maxY: number
  done: boolean
}

class Point {
  x: number
  y: number

  constructor([x, y]: number[]) {
    this.x = x
    this.y = y
  }
}

class Particle extends Point {
  resting = false

  constructor([x, y]: number[], resting: boolean = false) {
    super([x, y])
    this.resting = resting
  }
}

class Wall {
  from: Point
  to: Point

  constructor(from: Point, to: Point) {
    this.from = from
    this.to = to
  }

  intersects({ x, y }: Point): boolean {
    // vertiacal
    if (
      x === this.from.x &&
      (inRange(y, this.from.y, this.to.y) || y === this.to.y)
    ) {
      return true
    }

    // horizontal
    if (
      y === this.from.y &&
      (inRange(x, this.from.x, this.to.x) || x === this.to.x)
    ) {
      return true
    }

    return false
  }
}

export default class Day14 extends Puzzle {
  static INITIAL_STATE = {
    particles: [],
    walls: [],
    source: { x: 500, y: 0 },
    maxY: 0,
    done: false,
  }

  state: State = Day14.INITIAL_STATE

  private addWall(from: Point | number[], to: Point | number[]) {
    if (!(from instanceof Point)) {
      from = new Point(from)
    }
    if (!(to instanceof Point)) {
      to = new Point(to)
    }
    this.state.walls.push(new Wall(from, to))
    this.state.maxY = Math.max(from.y, to.y, this.state.maxY)
  }

  private isAir({ x, y }: Point): boolean {
    return (
      this.state.particles.every(({ x: u, y: v }) => !(u === x && v === y)) &&
      this.state.walls.every((wall) => !wall.intersects({ x, y }))
    )
  }

  private next() {
    const { particles, walls, source, maxY, done } = this.state

    // Get falling sand
    const sandIndex = particles.findIndex(({ resting }) => !resting)

    // Part 2 condition
    const particleOnSource = particles.find(({ x, y }) => x === source.x && y === source.y)
    if (sandIndex === -1 && particleOnSource) {
      if (particleOnSource.resting) {
        this.state = { ...this.state, done: true }
        return
      } else {
        throw new Error(`Particle on source but moving should not have happened.`)
      }
    }

    // When all sand is resting, generate new unit
    if (sandIndex === -1) {
      particles.push(new Particle([source.x, source.y]))
      return
    }

    // Check if we are done
    if (particles[sandIndex].y >= maxY) {
      this.state = { ...this.state, done: true }
      return
    }

    // Update position
    const { x, y } = particles[sandIndex]
    if (this.isAir({ x, y: y + 1 })) {
      particles[sandIndex] = new Particle([x, y + 1])
      return
    } else if (this.isAir({ x: x - 1, y: y + 1 })) {
      particles[sandIndex] = new Particle([x - 1, y + 1])
      return
    } else if (this.isAir({ x: x + 1, y: y + 1 })) {
      particles[sandIndex] = new Particle([x + 1, y + 1])
      return
    } else {
      particles[sandIndex].resting = true
    }

    this.state = { particles, walls, source, maxY, done }
  }

  public solveFirst(): string | number {
    this.state = Day14.INITIAL_STATE

    this.input
      .split('\n')
      .map((line) => line.split(' -> '))
      .forEach((coordinates) => {
        for (let i = 1; i < coordinates.length; i++) {
          const from = coordinates[i - 1].split(',').map(Number)
          const to = coordinates[i].split(',').map(Number)
          this.addWall(from, to)
        }
      })

    while (!this.state.done) {
      this.next()
    }

    return this.state.particles.length - 1
  }

  public solveSecond(): string | number {
    this.state = Day14.INITIAL_STATE

    this.input
      .split('\n')
      .map((line) => line.split(' -> '))
      .forEach((coordinates) => {
        for (let i = 1; i < coordinates.length; i++) {
          const from = coordinates[i - 1].split(',').map(Number)
          const to = coordinates[i].split(',').map(Number)
          this.addWall(from, to)
        }
      })

    this.addWall(
      new Point([-Infinity, this.state.maxY + 2]),
      new Point([Infinity, this.state.maxY + 2])
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