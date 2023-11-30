import AbstractPuzzle from '@utils/AbstractPuzzle'
import { chunk, intersection } from '@utils/array'

export default class Day3 extends AbstractPuzzle {
  get input(): string {
    return this.rawInput
  }

  /**
   * Convert an item to its priority
   *  - Lowercase item types a through z have priorities 1 through 26.
   *  - Uppercase item types A through Z have priorities 27 through 52.
   *
   * @param item The item to get the priority of
   * @returns {number} The priority of the item
   */
  private priority(item: string): number {
    const charCode = item.charCodeAt(0)
    return charCode >= 97 ? charCode - 96 : charCode - 38
  }

  public solveFirst(): number {
    return this.input
      .split('\n') // Split input into lines
      .map((rucksack) => [
        // Compartments are halfs of the rucksack
        rucksack.slice(0, rucksack.length / 2),
        rucksack.slice(rucksack.length / 2),
      ])
      .map(
        // Find the character that is present in both compartments
        ([first, second]) =>
          Array.from(first).find((char) => second.indexOf(char) !== -1) || ''
      )
      .map(this.priority) // Convert the character to their priority
      .reduce((a, b) => a + b, 0) // Sum the priorities
  }

  public solveSecond(): number {
    return chunk(this.input.split('\n'), 3) // Make chunks of three lines
      .map((items) => items.map((elv) => Array.from(elv))) // Convert each line to an array of characters
      .map(([arr0, ...arrs]) => intersection(arr0, ...arrs)) // Find the intersection of the three arrays
      .map((intersection) => <string>intersection[0]) // Get the first character of the intersection
      .map(this.priority) // Convert the character to their priority
      .reduce((a, b) => a + b, 0) // Sum the priorities
  }
}
  