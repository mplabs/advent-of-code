
import AbstractPuzzle from '@utils/AbstractPuzzle'

export function getSets(input: string) {
  const [_, inputSets] = input.split(': ')
  return input.split('; ').map((set) => {
    console.log({ set })
  })
    // set.match(/(?<red>\d+) red|(?<green>\d+) green|(?<blue>\d+) blue/g)?.groups)
}

export default class Day2 extends AbstractPuzzle {
  get input() {
    return this.rawInput
      .split('\n')
  }

  public solveFirst(): unknown {
    this.input.forEach((line) => {
      const [_, id, rest] = line.match(/^Game (\d+): (.*)/)!
      const sets = rest.split('; ').map((set) =>
        set.match(/(?<red>\d+) red|(?<green>\d+) green|(?<blue>\d+) blue/g)?.groups)
      console.log(id, sets)
    })

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
  