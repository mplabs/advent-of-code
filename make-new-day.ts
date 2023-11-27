import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const newDayNameRegexp = /\d{4}\/[0][0-9]|[1][0-2]/

const [dayToSolve] = process.argv.slice(2)

if (!newDayNameRegexp.test(dayToSolve)) {
  console.error(`Usage: bun run create <year>/<day>\n e.g. "bun run create 2023/03"`)
}

if (existsSync(`./${dayToSolve}`)) {
  console.info(`${dayToSolve} exists already`)
  process.exit(0)
}

try {
  await mkdir(dayToSolve, { recursive: true })
  await Bun.write(`${dayToSolve}/index.ts`, generatePuzzleTS(dayToSolve))
  await Bun.write(`${dayToSolve}/input.txt`, '')
  await Bun.write(`${dayToSolve}/README.md`, '')

} catch (e: any) {
  console.error(e)
  process.exit(1)
}

process.exit(0)

//////////

function generatePuzzleTS(day: string) {
  const dayNumber = day.replace(/(\d{4}\/0?)/, '')

  return `
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day${dayNumber} extends AbstractPuzzle {
  public solveFirst(): unknown {
    return null
  }

  public solveSecond(): unknown {
    return null
  }
}
  `
}
