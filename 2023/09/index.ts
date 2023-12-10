import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day9 extends AbstractPuzzle {
  get input(): number[][] {
    return this.rawInput
      .split('\n')
      .map((line) => line
        .split(' ')
        .map(Number))
  }

  differences(input: number[]): number[] {
    const differences = []
    for (let i = 0; i < input.length - 1; i++) {
      differences.push(input[i + 1] - input[i])
    }
    return differences
  }

  // Go thoriugh a list of numbers one by one and generate a new list of numbers
  // containing the differences between each number.
  // With that new list, generate the next list of numbers containing the differences
  // between each number until the list contains only 0s.
  // Append the previous lists so that the difference between the former last element
  // and the appended element is the last element of the next list.
  recursiveDifferences(input: number[]): number[] {
    let differences = this.differences(input)
    let nextDifferences = this.differences(differences)
    while (!nextDifferences.every((difference) => difference === 0)) {
      differences = [...differences, ...nextDifferences]
      nextDifferences = this.differences(nextDifferences)
    }
    return differences
  }
  

  public solveFirst(): unknown {
    console.log(this.recursiveDifferences(this.input[0]))

    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
