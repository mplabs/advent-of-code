
import AbstractPuzzle from '@utils/AbstractPuzzle'
import { run } from "../shared/computer.ts";

export default class Day5 extends AbstractPuzzle {
  get input() {
    return this.rawInput
      .split(',')
      .map(Number)
  }

  public solveFirst(): unknown {
    const { outputs } = run(this.input, 1)

    return outputs.slice(-1)[0]
  }

  public solveSecond(): unknown {
    const { outputs } = run(this.input, 5)

    return outputs.slice(-1)[0]
  }
}
  