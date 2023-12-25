import { Graph } from '@datastructures-js/graph'
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day25 extends AbstractPuzzle {
  _input?: Graph<string, boolean>
  get input(): Graph<string, boolean> {
    if (!this._input) {
      this._input = new Graph()

      this.rawInput.split('\n').forEach((line) => {
        const [from, tos] = line.split(': ')

        // Add vertices
        if (!this._input!.hasVertex(from)) {
          this._input!.addVertex(from, true)
        }

        tos.split(' ').forEach((to) => {
          if (!this._input!.hasVertex(to)) {
            this._input!.addVertex(to, true)
          }
          this._input!.addEdge(from, to)
        })
      })
    }

    return this._input
  }

  public solveFirst(): unknown {
    console.log(this.input)

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
  