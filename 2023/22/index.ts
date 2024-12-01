import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day22 extends AbstractPuzzle {
  _input?: Map<string, number>
  get input(): Map<string, number> {
    if (!this._input) {
      this._input = new Map()
      this.rawInput.split('\n').forEach((line, idx) => {
        const [from, to] = line.split('~')
        const [x1, y1, z1] = from.split(',').map(Number)
        const [x2, y2, z2] = to.split(',').map(Number)
        for (let x = x1; x <= x2; x++) {
          for (let y = y1; y <= y2; y++) {
            for (let z = z1; z <= z2; z++) {
              this._input!.set(`${x},${y},${z}`, idx)
            }
          }
        }
      })
    }

    return this._input
  }

  public solveFirst(): unknown {
    

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
