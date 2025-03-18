// components/SnakeGame.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define types
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | null;
type Position = { x: number; y: number };
type GameStatus = "NOT_STARTED" | "PLAYING" | "GAME_OVER";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAME_SPEED = 100;
const INITIAL_SNAKE_LENGTH = 3;

const SnakeGame = () => {
  // Game state
  const [snake, setSnake] = useState<Position[]>([]);
  const [food, setFood] = useState<Position | null>(null);
  const [direction, setDirection] = useState<Direction>(null);
  const [nextDirection, setNextDirection] = useState<Direction>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("NOT_STARTED");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  // Initialize game
  const initializeGame = useCallback(() => {
    // Create initial snake in the middle of the board
    const initialSnake: Position[] = [];
    const middleX = Math.floor(GRID_SIZE / 2);
    const middleY = Math.floor(GRID_SIZE / 2);
    
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: middleX - i, y: middleY });
    }
    
    setSnake(initialSnake);
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    generateFood(initialSnake);
    setGameStatus("PLAYING");
    setScore(0);
  }, []);

  // Generate food at random position
  const generateFood = (currentSnake: Position[]) => {
    let newFood: Position;
    let foodOnSnake = true;
    
    while (foodOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      
      foodOnSnake = currentSnake.some(segment => 
        segment.x === newFood.x && segment.y === newFood.y
      );
      
      if (!foodOnSnake) {
        setFood(newFood);
      }
    }
  };

  // Check if position is on snake
  const isPositionOnSnake = (pos: Position, snakeBody: Position[] = snake): boolean => {
    return snakeBody.some(segment => segment.x === pos.x && segment.y === pos.y);
  };

  // Handle keyboard input
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Prevent default behavior for arrow keys and WASD
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
      e.preventDefault();
    }
    
    if (gameStatus !== "PLAYING") return;

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        if (direction !== "DOWN") setNextDirection("UP");
        break;
      case "ArrowDown":
      case "s":
      case "S":
        if (direction !== "UP") setNextDirection("DOWN");
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        if (direction !== "RIGHT") setNextDirection("LEFT");
        break;
      case "ArrowRight":
      case "d":
      case "D":
        if (direction !== "LEFT") setNextDirection("RIGHT");
        break;
    }
  }, [direction, gameStatus]);

  // Game loop
  useEffect(() => {
    if (gameStatus !== "PLAYING") return;
    
    const moveSnake = () => {
      setDirection(nextDirection);
      
      setSnake(prevSnake => {
        // Create new snake head based on direction
        const head = { ...prevSnake[0] };
        
        switch (nextDirection) {
          case "UP":
            head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case "DOWN":
            head.y = (head.y + 1) % GRID_SIZE;
            break;
          case "LEFT":
            head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case "RIGHT":
            head.x = (head.x + 1) % GRID_SIZE;
            break;
        }
        
        // Check collision with self
        if (isPositionOnSnake(head, prevSnake.slice(0, -1))) {
          setGameStatus("GAME_OVER");
          if (score > highScore) {
            setHighScore(score);
          }
          return prevSnake;
        }
        
        // Create new snake body
        const newSnake = [head, ...prevSnake];
        
        // Check if snake ate food
        if (food && head.x === food.x && head.y === food.y) {
          setScore(prevScore => prevScore + 10);
          generateFood(newSnake);
        } else {
          // Remove tail if no food eaten
          newSnake.pop();
        }
        
        return newSnake;
      });
    };
    
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [nextDirection, food, gameStatus, score, highScore]);

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Start game
  const startGame = () => {
    initializeGame();
  };

  // Render game board grid
  const renderGrid = () => {
    const cells = [];
    
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnakeSegment = isPositionOnSnake({ x, y });
        const isSnakeHead = isSnakeSegment && snake[0].x === x && snake[0].y === y;
        const isFood = food && food.x === x && food.y === y;
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`
              w-5 h-5 rounded-sm
              ${isSnakeHead ? "bg-[#00BD95]" : ""}
              ${isSnakeSegment && !isSnakeHead ? "bg-[#00a884]" : ""}
              ${isFood ? "bg-[#00FFC9]" : ""}
              ${!isSnakeSegment && !isFood ? "bg-gray-800" : ""}
            `}
          />
        );
      }
    }
    
    return cells;
  };

  // Render controls info
  const renderControlsInfo = () => (
    <div className="bg-gray-800 rounded-lg p-3 md:p-4 text-center mt-4">
      <p className="text-gray-400 text-xs md:text-sm mb-1">Controls</p>
      <div className="flex justify-center gap-2 text-[#00BD95]">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-1">
            <div></div>
            <div className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded">↑</div>
            <div></div>
            <div className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded">←</div>
            <div className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded">↓</div>
            <div className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded">→</div>
          </div>
        </div>
        <div className="mx-2 text-gray-500">or</div>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-1">
            <div></div>
            <div className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded">W</div>
            <div></div>
            <div className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded">A</div>
            <div className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded">S</div>
            <div className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded">D</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render start screen
  const renderStartScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col items-center py-8 px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Play <span className="text-[#00BD95]">Snake</span>
      </h2>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        className="px-6 py-3 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg shadow-xl hover:shadow-[0_5px_15px_rgba(0,_189,_149,_0.4)] transition-all text-lg"
      >
        Start Game
      </motion.button>
      
      {renderControlsInfo()}
    </motion.div>
  );

  // Render game over screen
  const renderGameOverScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-10 p-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Game Over</h2>
      <p className="text-xl text-[#00BD95] mb-4">Score: {score}</p>
      <p className="text-md text-gray-400 mb-6">High Score: {highScore}</p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        className="px-6 py-3 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg shadow-xl hover:shadow-[0_5px_15px_rgba(0,_189,_149,_0.4)] transition-all"
      >
        Play Again
      </motion.button>
    </motion.div>
  );

  // Render game
  const renderGame = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md mx-auto px-4"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-gray-400 text-xs">Score</p>
          <p className="text-[#00BD95] text-xl font-semibold">{score}</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-gray-400 text-xs">High Score</p>
          <p className="text-[#00BD95] text-xl font-semibold">{highScore}</p>
        </div>
      </div>
      
      <div className="relative">
        <div 
          className="grid grid-flow-row gap-0 bg-gray-900 rounded-lg p-1 shadow-xl border border-gray-800"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: `${GRID_SIZE * (CELL_SIZE + 1)}px`, 
            height: `${GRID_SIZE * (CELL_SIZE + 1)}px`,
            margin: '0 auto'
          }}
        >
          {renderGrid()}
        </div>
        
        {gameStatus === "GAME_OVER" && renderGameOverScreen()}
      </div>
      
      {renderControlsInfo()}
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center justify-center bg-[#171c22] p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center">
        <span className="text-[#00BD95]">Snake</span> Game
      </h1>
      
      {gameStatus === "NOT_STARTED" ? renderStartScreen() : renderGame()}
    </div>
  );
};

export default SnakeGame;