import AbstractPuzzle from '@utils/AbstractPuzzle'

/**
 * Split input into lines and convert each line to a number.
 */
export default class Day1 extends AbstractPuzzle {
  get input() {
    return this.rawInput.split('\n').map((line) => Number.parseInt(line, 10))
  }

  /**
   * Fuel required to launch a given module is based on its mass.
   * Specifically, to find the fuel required for a module,
   * take its mass, divide by three, round down, and subtract 2.
   */
  public solveFirst(): unknown {
    return this.input.map((mass) => Math.floor(mass / 3) - 2).reduce((acc, mass) => acc + mass, 0)
  }

  /**
   * Fuel itself requires fuel just like a module - take its mass, divide by three, round down,
   * and subtract 2. However, that fuel also requires fuel, and that fuel requires fuel, and so on.
   * Any mass that would require negative fuel should instead be treated as if it requires zero fuel;
   * the remaining mass, if any, is instead handled by wishing really hard, which has no mass
   * and is outside the scope of this calculation.
   */
  public solveSecond(): unknown {
    return this.input.map(calculateFule).reduce((acc, fuel) => acc + fuel, 0)

    ////////

    function calculateFule(mass: number): number {
      const fuel = Math.floor(mass / 3) - 2
      if (fuel <= 0) {
        return 0
      }
      return fuel + calculateFule(fuel)
    }
  }
}
