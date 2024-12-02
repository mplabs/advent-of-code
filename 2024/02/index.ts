import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day2 extends AbstractPuzzle {
    get input(): number[][] {
        return this.rawInput
            .split('\n')
            .map((line) => line.split(' ').map((value) => parseInt(value)))
    }

    public solveFirst(): unknown {
        return this.input.filter(this.isSafe).length
    }

    public solveSecond(): unknown {
        let safeReports = 0

        for (const report of this.input) {
            // Report is safe without removing any level
            if (this.isSafe(report)) {
                safeReports++
                continue
            }

            // Remove one value at a time and try again
            for (let idx = 0; idx < report.length; idx++) {
                const candidate = [...report.slice(0, idx), ...report.slice(idx + 1)]

                if (this.isSafe(candidate)) {
                    safeReports++
                    break
                }
            }
        }

        return safeReports
    }

    private isSafe(report: number[]) {
        const isIncreasing = report.every((value, idx, arr) => idx === 0 || value > arr[idx - 1])
        const isDecreasing = report.every((value, idx, arr) => idx === 0 || value < arr[idx - 1])
        const steady = report
            .map((value, idx, arr) => (idx === 0 ? 1 : Math.abs(value - arr[idx - 1])))
            .every((change) => change > 0 && change < 4)

        return (isIncreasing || isDecreasing) && steady
    }
}
