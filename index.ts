
const [dayToSolve] = process.argv.slice(2)

if (!dayToSolve) {
  console.error(`Usage: bun run solve <year>/<day>`)
  process.exit(1)
}

try {
  const input = await Bun.file(`${import.meta.dir}/${dayToSolve}/input.txt`).text()
  const { default: puzzleFactory } = await import(`./${dayToSolve}`)
  const puzzle = new puzzleFactory(input)
  console.log(`First:`, puzzle.solveFirst())
  console.log(`Second:`, puzzle.solveSecond())
} catch (e: any) {
  console.error(e)
}

export {}
