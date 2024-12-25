export function transpose<T>(grid: T[][]): T[][] {
    return grid[0].map((_, i) => grid.map((row) => row[i]))
}

export function rotate90Clockwise<T>(matrix: T[][]): T[][] {
    return transpose(matrix).map(row => row.reverse())
}
