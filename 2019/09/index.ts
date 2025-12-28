
import { Computer, run } from '2019/shared/computer'
import AbstractPuzzle from '@utils/AbstractPuzzle'

export default class Day9 extends AbstractPuzzle {
    get input() {
        return this.rawInput.split(',').map(Number)
    }
    public solveFirst(): unknown {
        const computer = new Computer(this.input, [1])
        
        while (!computer.halted) {
            computer.run()
        }
        
        return computer.getOutput()
    }

    public solveSecond(): unknown {
        const computer = new Computer(this.input, [2])
        
        while (!computer.halted) {
            computer.run()
        }
        
        return computer.getOutput()
    }
}
