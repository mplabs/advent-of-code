import { test, expect } from 'bun:test'

import { getSets } from '.'

test('getSets', () => {
  const input = `Game 1: 1 red, 2 green, 3 blue; 2 red, 3 green, 1 blue; 3 red, 1 green, 2 blue`
  const expected = [
    { red: '1', green: '2', blue: '3' },
    { red: '2', green: '3', blue: '1' },
    { red: '3', green: '1', blue: '2' },
  ]
  console.log({ getSets: getSets(input) }) 
  expect(getSets(input)).toEqual(expected)
})
