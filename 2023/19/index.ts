import AbstractPuzzle from '@utils/AbstractPuzzle'

type Workflow = (part: Part) => boolean
type Part = { [k: string]: number }

export default class Day19 extends AbstractPuzzle {
  _workflows?: Record<string, Workflow>
  get workflows(): Record<string, Workflow> {
    if (!this._workflows) {
      this._workflows = Object.fromEntries(
        this.rawInput
          .split('\n\n')[0]
          .split('\n')
          .map((line) => {
            const [, label, expressions] = line.match(/^([a-z]+){(.+)}/)!
            const matches = [
              ...expressions.matchAll(/(?:([a-zAR]+)([<>])(\d+):([a-zAR]+)|[a-zAR])+/g)!,
            ]

            let functionBody = ''
            for (const match of matches) {
              if (typeof match[1] === 'undefined') {
                functionBody += `return ${getTarget(match[0])};`
              } else {
                const [, variable, operator, term, target] = match
                functionBody += `if (part['${variable}'] && part['${variable}'] ${operator} ${term}) return ${getTarget(
                  target
                )};\n`
              }
            }

            return [label, new Function('part', functionBody).bind(this) as Workflow]

            function getTarget(match: string): string {
              if (match === 'A') {
                return 'true'
              } else if (match === 'R') {
                return 'false'
              } else {
                return `this.workflows['${match}'](part)`
              }
            }
          })
      )
    }

    return this._workflows
  }

  _parts?: Part[]
  get parts(): Part[] {
    if (!this._parts) {
      this._parts = this.rawInput
        .split('\n\n')[1]
        .split('\n')
        .map((line) =>
          Object.fromEntries(
            [...line.matchAll(/([a-z])=(\d+),?/g)].map(([, k, v]) => [k, parseInt(v)])
          )
        )
    }

    return this._parts
  }

  public solveFirst(): unknown {
    const result = this.parts
      .filter((part) => this.workflows['in'](part))
      .map(({ x, m, a, s }) => x + m + a + s)
      .reduce((a, b) => a + b, 0)
  
    return result
  }

  public solveSecond(): unknown {
    return null
  }
}
