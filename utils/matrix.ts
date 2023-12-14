export function transpose<T>(grid: T[][]): T[][] {
  return grid[0].map((_, i) => grid.map((row) => row[i]))
}
