export default abstract class AbstractPuzzle {
  protected readonly rawInput: string = ''
  get input(): unknown {
      return this.rawInput
  }

  constructor(input: string) {
      this.rawInput = input
  }

  public abstract solveFirst(): unknown
  public abstract solveSecond(): unknown
}

