import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day4 extends AbstractPuzzle {
  get input() {
    return this.rawInput
  }

  public solveFirst(): unknown {
    const [from, to] = this.input.split('-').map(Number)

    // (?=\d{6}$) - match six-digit numbers
    // (?=.*(\d)\1) - match two adjecent digits are the same
    // (?:0|1(?!0)|2(?![01])|3(?![0-2])|4(?![0-3])|5(?![0-4])|6(?![0-5])|7(?![0-6])|8(?![0-7])|9(?![0-8])) - Take care of never decreasing ditits
    //    0 or 1 not followed by 1, 2 not followed by 0 or 1, and so on...
    const regExp =
      /^(?=\d{6}$)(?=.*(\d)\1)(?:0|1(?!0)|2(?![01])|3(?![0-2])|4(?![0-3])|5(?![0-4])|6(?![0-5])|7(?![0-6])|8(?![0-7])|9(?![0-8]))+$/

    let count = 0
    for (let i = from; i <= to; i++) {
      if (regExp.test(i.toString())) {
        count++
      }
    }

    return count
  }

  public solveSecond(): unknown {
    const [from, to] = this.input.split('-').map(Number)

    // This is the same as above, but instead of (?=.*(\d)\1) we use
    // (?=(?:.*(\d)(?!\1))?(\d)\2(?!\2)) - to make sure two and only two adjecent digits are the same
    const regExp =
      /^(?=\d{6}$)(?=(?:.*(\d)(?!\1))?(\d)\2(?!\2))(?:0|1(?!0)|2(?![01])|3(?![0-2])|4(?![0-3])|5(?![0-4])|6(?![0-5])|7(?![0-6])|8(?![0-7])|9(?![0-8]))+$/

    // The loop could be optimized better, sice we know what the next number must have higher digits in the next place,
    // but it runs quickly enough.
    let count = 0
    for (let i = from; i <= to; i++) {
      if (regExp.test(i.toString())) {
        count++
      }
    }

    return count
  }
}
