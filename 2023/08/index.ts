import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day8 extends AbstractPuzzle {
  instructions: ('L' | 'R')[]
  network: Map<string, { L: string; R: string }>

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
    // while (currentNode !== 'ZZZ') {
    //   const instruction = this.instructions[i % this.instructions.length]
    //   currentNode = this.network.get(currentNode)![instruction]

    //   i++
    // }

    return i
  }

  public solveSecond(): unknown {
    // Figure out the lengths of the paths the ghosts will take to reach
    // the node ending with 'Z' and multiply them together
    

    return 0
  }
}
