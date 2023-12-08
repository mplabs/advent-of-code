import AbstractPuzzle from '@utils/AbstractPuzzle'
import { memoize } from '@utils/utils'

export default class Day7 extends AbstractPuzzle {
  get input(): [hand: string, bet: number][] {
    return memoize((input: string) =>
      input
        .split('\n')
        .map((l) => l.split(' '))
        .map(([hand, bet]) => [hand, Number(bet)] as [string, number])
    )(this.rawInput)
  }

  public solveFirst(): number {
    const scores = this.input
      .map(([hand, bet]) => {
        console.log({ hand, bet, score: this.score(hand) })
        return [this.score(hand), bet]
      })
      .sort((a, b) => b[0] + a[0])
    

    return scores.reduce((acc, [_, bet], i) => acc + (i + 1) * bet, 0)
  }

  public solveSecond(): number {
    return null
  }

  // Every hand is exactly one type. From strongest to weakest, they are:
  // Five of a kind, where all five cards have the same label: AAAAA
  // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
  // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
  // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
  // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
  // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
  // High card, where all cards' labels are distinct: 23456
  public score(hand: string): number {
    const values = hand.split('').map((v) => {
      switch (v) {
        case 'T':
          return 10
        case 'J':
          return 11
        case 'Q':
          return 12
        case 'K':
          return 13
        case 'A':
          return 14
        default:
          return Number(v)
      }
    })

    
    values.sort((a, b) => a - b)
    
    const set = new Set(values)
    const uniqueValues = Array.from(set.values())
    
    
    if (uniqueValues.length === 1) {
      return 1000000 + uniqueValues[0]
    }
    
    if (uniqueValues.length === 2) {
      const [a, b] = uniqueValues
      
      if (values.filter((v) => v === a).length === 4) {
        return 100000 + a
      }
      
      return 100000 + b
    }
    
    if (uniqueValues.length === 3) {
      const [a, b, c] = uniqueValues
      
      if (values.filter((v) => v === a).length === 3) {
        return 10000 + a
      }

      if (values.filter((v) => v === b).length === 3) {
        return 10000 + b
      }

      return 10000 + c
    }

    if (uniqueValues.length === 4) {
      const [a, b, c, d] = uniqueValues

      if (values.filter((v) => v === a).length === 2) {
        return 1000 + a
      }

      if (values.filter((v) => v === b).length === 2) {
        return 1000 + b
      }

      if (values.filter((v) => v === c).length === 2) {
        return 1000 + c
      }

      return 1000 + d
    }

    const [a, b, c, d, e] = uniqueValues

    if (a + 1 === b && b + 1 === c && c + 1 === d && d + 1 === e) {
      return 100 + e
    }

    return 0
  }
}
