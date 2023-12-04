import { test, expect } from 'bun:test'
import Day3 from '.'

test('Day 3 - Day 1', () => {
  const testCases = [
    {
      input: `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
      expected: 4361
    }
  ]

  for (const { input, expected } of testCases) {
    const puzzle = new Day3(input)
    expect(puzzle.solveFirst()).toEqual(expected)
  }
})
