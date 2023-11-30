
import AbstractPuzzle from '@utils/AbstractPuzzle'

type Monkey = {
  items: number[]
  operation: Function
  divisor: number
  true: number
  false: number
  count: number
}

export default class Day11 extends AbstractPuzzle {
  get input(): string {
    return this.rawInput
  }

  private mapMonkey(definition: string): Monkey {
    return {
      items: definition
        .match(/Starting items: (?<startingItems>(\d+)(,\s*\d+)*)/)
        ?.groups?.startingItems.split(', ')
        .map(Number),
      operation: new Function(
        'old',
        `"use strict";return (${
          definition.match(/Operation: new = (.+)/)?.[1]
        });`
      ),
      divisor: parseInt(
        definition.match(/Test: divisible by (\d+)/)?.[1] || '1'
      ),
      true: parseInt(
        definition.match(/If true: throw to monkey (\d+)/)?.[1] || '0'
      ),
      false: parseInt(
        definition.match(/If false: throw to monkey (\d+)/)?.[1] || '0'
      ),
      count: 0,
    } as Monkey
  }

  public solveFirst(): unknown {
    const monkeys: Monkey[] = this.input.split('\n\n').map(this.mapMonkey)

    const ROUNDS = 20

    for (let round = 0; round < ROUNDS; round++) {
      monkeys.forEach((monkey, idx) => {
        monkey.items
          .map((item) => monkey.operation(item))
          .map((item) => Math.floor(item / 3))
          .forEach((item) => {
            monkeys[idx].count++
            if (item % monkey.divisor === 0) {
              monkeys[monkey.true].items.push(item)
            } else {
              monkeys[monkey.false].items.push(item)
            }
          })
        monkeys[idx].items = []
      })
    }

    return monkeys
      .map(({ count }) => count)
      .sort((a, b) => a - b)
      .slice(-2)
      .reduce((acc, cur) => acc * cur, 1)
  }

  public solveSecond(): unknown {
    const monkeys: Monkey[] = this.input.split('\n\n').map(this.mapMonkey)

    const ROUNDS = 10000

    for (let round = 0; round < ROUNDS; round++) {
      monkeys.forEach((monkey, idx) => {
        monkey.items
          .map((item) => monkey.operation(item))
          .map(item => item % monkeys.reduce((acc, { divisor }) => acc * divisor, 1))
          .forEach((item) => {
            monkeys[idx].count++

            if (item % monkey.divisor === 0) {
              monkeys[monkey.true].items.push(item)
            } else {
              monkeys[monkey.false].items.push(item)
            }
          })
        monkeys[idx].items = []
      })
    }

    return monkeys
      .map(({ count }) => count)
      .sort((a, b) => a - b)
      .slice(-2)
      .reduce((acc, cur) => acc * cur, 1)
  }
}
  