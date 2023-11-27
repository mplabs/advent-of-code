import { expect, test } from 'bun:test'

import Day3 from '.'

const sampleInputs = [
  {
    input: 'R8,U5,L5,D3\nU7,R6,D4,L4',
    closest: 6,
    steps: 30,
  },
  {
    input: 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83',
    closest: 159,
    steps: 610,
  },
  {
    input: 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
    closest: 135,
    steps: 410,
  },
]

let puzzle: Day3,
    idx = 0

for (const { input, closest, steps } of sampleInputs) {
  idx++

  test(`Day3 - Sample #${idx}`, () => {
    puzzle = new Day3(input)
    expect(puzzle.solveFirst()).toBe(closest)
    expect(puzzle.solveSecond()).toBe(steps)
  })
}
