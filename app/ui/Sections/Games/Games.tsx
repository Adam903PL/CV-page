
import { BackgroundCircles } from '../../BgCircles'
import MemoryGame from './MemoryGame'
import SnakeGame from './SnakeGame'
import Tetris from './Tetris'
import TicTacToe from './TicTacToe'

const Games = () => {
  return (
    <section id="games" >

        <TicTacToe/>
        <MemoryGame/>
        <SnakeGame/>
        <Tetris/>
    </section>
  )
}

export default Games