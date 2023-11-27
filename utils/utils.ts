export const manhattenDistance = (
  [x1, y1]: [x: number, y: number],
  [x2, y2]: [x: number, y: number]
): number => Math.abs(x1 - x2) + Math.abs(y2 - y2)
