import { cursorTo, clearScreenDown } from 'node:readline'

import AbstractPuzzle from '@utils/AbstractPuzzle'
import { chunk } from '@utils/array'

import { Computer } from '2019/shared/computer'

export default class Day13 extends AbstractPuzzle {
    static readonly X_OFFSET = 2
    static readonly Y_OFFSET = 3
    static readonly HEIGHT = 22

    get input() {
        return this.rawInput.trim().split(',').map(Number)
    }

    public solveFirst(): unknown {
        const arcade = new Computer(this.input)

        arcade.run()

        const output = arcade.getOutput()
        const sprites = chunk(output, 3)

        return sprites.filter(([,,id]) => id === 2).length
    }

    public solveSecond(): unknown {
        const program = [...this.input]
        program[0] = 2 // Enable free play
        const arcade = new Computer(program)

        const screen = new Map<string, number>()
        let ballX = 0, paddleX = 0, score = 0

        while(!arcade.halted) {
            arcade.run()
            
            const output = arcade.getOutput()
            arcade.clearOutput()
            
            for (const [x, y, v] of chunk(output, 3)) {
                if (x === -1 && y === 0) {
                    score = v
                    continue
                }

                screen.set(`${x},${y}`, v)
                if (v === 3) {
                    paddleX = x
                }
                if (v === 4) {
                    ballX = x
                }
            }

            this.clearScreen()
            this.cursorTo(0, -1)
            process.stdout.write(`Score: ${score}   `)

            for (const [key, id] of screen) {
                const [x, y] = key.split(',').map(Number)
                this.drawTile(x, y, id)
            }

            arcade.addInput(Math.sign(ballX - paddleX))
        }
        
        this.cursorTo(-Day13.X_OFFSET, Day13.HEIGHT)
        
        return score
    }

    private clearScreen() {
        cursorTo(process.stdout, Day13.X_OFFSET, Day13.Y_OFFSET)
        clearScreenDown(process.stdout)
    }

    private drawTile(x: number, y: number, id: number) {
        let s = ' '
        switch (id) {
            case 1: s = '#'; break
            case 2: s = 'o'; break
            case 3: s = '='; break
            case 4: s = '*'; break
            default: break
        }
        this.cursorTo(x, y)
        process.stdout.write(s)
    }
    
    private cursorTo(x: number, y: number) {
        cursorTo(process.stdout, Day13.X_OFFSET + x, Day13.Y_OFFSET + y)
    }
}
