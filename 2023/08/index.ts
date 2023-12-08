import AbstractPuzzle from '@utils/AbstractPuzzle'

type Network = Map<string, { L: string; R: string }>

export default class Day8 extends AbstractPuzzle {
  instructions: ('L' | 'R')[]
  network: Network

  constructor(input: string) {
    super(input)
    const [instructions, network] = this.rawInput.split('\n\n')
    this.instructions = instructions.split('') as ('L' | 'R')[]
    this.network = new Map()
    network.split('\n').forEach((line) => {
      const [_, name, left, right] = Array.from(line.match(/(\w{3}) = \((\w{3}), (\w{3})\)/)!)
      this.network.set(name, { L: left, R: right })
    })
  }

  public solveFirst(): unknown {
    let currentNode = 'AAA',
      i = 0
    while (currentNode !== 'ZZZ') {
      const instruction = this.instructions[i % this.instructions.length]
      currentNode = this.network.get(currentNode)![instruction]

      i++
    }

    return i
  }

  public solveSecond(): unknown {
    // The trivial solution does not work here, because the paths
    // cycle at some point. Maybe we could remember what paths
    // we already took and skip them?

    return 0
  }
}
