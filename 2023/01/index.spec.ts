import { expect, test } from "bun:test";
import { getDigits, parseNumber } from ".";

const testCases = [
  { input: "two1nine", expected: [2,1,9] },
  { input: "eightwothree", expected: [8,2,3] },
  { input: "abcone2threexyz", expected: [1,2,3] },
  { input: "xtwone3four", expected: [2,1,3,4] },
  { input: "4nineeightseven2", expected: [4,9,8,7,2] },
  { input: "zoneight234", expected: [1,8,2,3,4] },
  { input: "7pqrstsixteen", expected: [7,6] },
]

test("getDigits", (t) => {
  testCases.forEach(({ input, expected }) => {
    expect(getDigits(input)).toEqual(expected)
  })
})
