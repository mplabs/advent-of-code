import AbstractPuzzle from '@utils/AbstractPuzzle'
import { transpose } from '@utils/matrix'

export default class Day14 extends AbstractPuzzle {
  get input(): string[][] {
    return this.rawInput.split('\n').map((row) => row.split(''))
  }

  public solveFirst(): unknown {
    console.log(this.partition(transpose(this.input)[0]))

    return null
  }

  public solveSecond(): unknown {
    return null
  }

  public partition(row: string[]): string[][] {
    return row
      .join('')
      .split('#')
      .filter(Boolean)
      .map((part) => part.split(''))
  }

  public moveRock(partition: string[]): string[] {
    let minY = 0,
      nextRock = partition.findIndex((char) => char === 'O')

    if (nextRock === -1 || nextRock <= minY) {
      // We are done
      return partition
    }

    // Move the rock
    partition[nextRock] = '.'
    partition[nextRock - 1] = 'O'

    return this.moveRock(partition)
  }
}
