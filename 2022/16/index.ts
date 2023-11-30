
import AbstractPuzzle from '@utils/AbstractPuzzle'

const PARSER_REGEXP = /Valve (?<valve>[A-Z]{2}).*rate=(?<rate>\d+);.*valves?.(?<tunnels>[A-Z]{2},?.*)+/

export default class Day16 extends AbstractPuzzle {
  valves: Record<string, { rate: number, tunnels: any, paths: any }> = {}

  bfs(frontier: string[], end: string) {
    let depth = 1

    while(true) {
      const nextFrontier: string[] = []
      for (const x of frontier) {
        if (x === end) {
          return depth
        }
        for (const y of this.valves[x]?.tunnels) {
          nextFrontier.push(y)
        }
      }
      frontier = nextFrontier
      depth++
    }
  }

  constructor(input: string) {
    super(input)

    this.rawInput
      .split('\n')
      .forEach(line => {
        const groups = line.match(PARSER_REGEXP)?.groups
        if (groups) {
          this.valves[groups.valve] = {
            rate: parseInt(groups.rate),
            tunnels: groups.tunnels.split(', '),
            paths: []
          }
        }
      })
    
    const keys = Object.entries(this.valves)
      .filter(([_, { rate }]) => rate !== 0)
      .map(([valve]) => valve)
      .sort()

    for (const k of ['AA', ...keys]) {
      for (const k2 of keys) {
        if (k2 !== k) {
          this.valves[k]['paths'][k2] = this.bfs(this.valves[k]['tunnels'], k2)
        }
      }
    }

  }

  public solveFirst(): number {
    let best = 0

    // console.log(this.valves)

    const search = (
      opened: string[],
      flowed: number,
      currentRoom: string,
      depthToGo: number
    ) => {
      if (flowed > best) {
        best = flowed
      }

      if (depthToGo <= 0) {
        return
      }

      if (opened.indexOf(currentRoom) === -1) {
        search(
          [...new Set(opened.concat(currentRoom))],
          flowed + this.valves[currentRoom]['rate'] * depthToGo,
          currentRoom,
          depthToGo - 1
        )
      } else {
        for (let k of Object.keys(this.valves[currentRoom]['paths'])) {
          if (opened.indexOf(k) !== -1) {
            continue
          }
          search(
            opened,
            flowed,
            k,
            depthToGo - this.valves[currentRoom]['paths'][k]
          )
        }
      }
    }

    search(['AA'], 0, 'AA', 29)

    return best
  }

  public solveSecond(): number {
    let best = 0

    const search = (
      opened: string[],
      flowed: number,
      currentRoom: string,
      depthToGo: number,
      elephantsTurn: boolean
    ) => {
      if (flowed > best) {
        best = flowed
      }

      if (depthToGo <= 0) {
        return
      }

      if (opened.indexOf(currentRoom) === -1) {
        search(
          [...new Set(opened.concat(currentRoom))],
          flowed + this.valves[currentRoom]['rate'] * depthToGo,
          currentRoom,
          depthToGo - 1,
          elephantsTurn
        )
        if (!elephantsTurn) {
          search([...new Set([currentRoom, ...opened])],flowed + this.valves[currentRoom]['rate'] * depthToGo, 'AA', 25, true)
        }
      } else {
        for (let k of Object.keys(this.valves[currentRoom]['paths'])) {
          if (opened.indexOf(k) !== -1) {
            continue
          }
          search(
            opened,
            flowed,
            k,
            depthToGo - this.valves[currentRoom]['paths'][k],
            elephantsTurn
          )
        }
      }
    }

    search(['AA'], 0, 'AA', 25, false)

    return best
  }
}
  