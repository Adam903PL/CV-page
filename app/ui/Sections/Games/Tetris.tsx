// components/Tetris.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Definicje typów
type CellValue = string | null;
type BoardState = CellValue[][];
type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
type TetrominoState = {
  shape: number[][];
  position: { x: number, y: number };
  type: TetrominoType;
};

// Kształty tetromino
const TETROMINOES = {
  'I': {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00FFFF'
  },
  'O': {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#FFFF00'
  },
  'T': {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#AA00FF'
  },
  'S': {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00FF00'
  },
  'Z': {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#FF0000'
  },
  'J': {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000FF'
  },
  'L': {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#FF8800'
  }
};

// Konfiguracja gry
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000;
const MAX_SPEED = 1000;
const SPEED_INCREMENT = 500;
const POINTS_PER_LINE = 100;

const Tetris = () => {
  // Stan gry
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<TetrominoState | null>(null);
  const [nextPiece, setNextPiece] = useState<TetrominoState | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [lines, setLines] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Tworzenie pustej planszy
  function createEmptyBoard(): BoardState {
    return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
  }

  // Generowanie losowego tetromino
  const generateRandomTetromino = useCallback((): TetrominoState => {
    const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    return {
      shape: TETROMINOES[randomType].shape,
      position: { 
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINOES[randomType].shape[0].length / 2), 
        y: 0 
      },
      type: randomType
    };
  }, []);

  // Rozpocznij nową grę
  const startGame = () => {
    // Reset stanów gry
    setBoard(createEmptyBoard());
    setScore(0);
    setLevel(1);
    setLines(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    
    // Wygeneruj pierwsze klocki
    const firstPiece = generateRandomTetromino();
    const secondPiece = generateRandomTetromino();
    
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
    setGameStarted(true);
    setIsPaused(false);
  };

  // Przerwij/wznów grę
  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused);
    }
  };

  // Sprawdzanie kolizji
  const checkCollision = useCallback((piece: TetrominoState, boardState: BoardState, offsetX = 0, offsetY = 0): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        // Sprawdź czy komórka klocka jest wypełniona
        if (piece.shape[y][x] !== 0) {
          const newX = piece.position.x + x + offsetX;
          const newY = piece.position.y + y + offsetY;

          // Sprawdź kolizję z granicami planszy
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true;
          }

          // Sprawdź kolizję z innymi klockami
          if (newY >= 0 && boardState[newY][newX] !== null) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  // Obracanie klocka
  const rotatePiece = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;

    // Algorytm obrotu macierzy 90 stopni w prawo
    const rotatedShape = currentPiece.shape.map((_, index) =>
      currentPiece.shape.map(row => row[row.length - 1 - index])
    );
    
    const rotatedPiece = {
      ...currentPiece,
      shape: rotatedShape
    };
    
    // Sprawdź kolizję po obrocie
    if (!checkCollision(rotatedPiece, board)) {
      setCurrentPiece(rotatedPiece);
    } 
    // Wall kick - spróbuj trochę przesunąć jeśli nie mieści się przy ścianie
    else {
      // Spróbuj przesunąć w lewo lub w prawo, jeśli nie można obrócić
      for (const offset of [-1, 1, -2, 2]) {
        const kickedPiece = {
          ...rotatedPiece,
          position: {
            ...rotatedPiece.position,
            x: rotatedPiece.position.x + offset
          }
        };
        
        if (!checkCollision(kickedPiece, board)) {
          setCurrentPiece(kickedPiece);
          return;
        }
      }
    }
  }, [currentPiece, board, checkCollision, isPaused, gameOver]);

  // Ruch w lewo
  const moveLeft = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;
    
    if (!checkCollision(currentPiece, board, -1, 0)) {
      setCurrentPiece({
        ...currentPiece,
        position: {
          ...currentPiece.position,
          x: currentPiece.position.x - 1
        }
      });
    }
  }, [currentPiece, board, checkCollision, isPaused, gameOver]);

  // Ruch w prawo
  const moveRight = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;
    
    if (!checkCollision(currentPiece, board, 1, 0)) {
      setCurrentPiece({
        ...currentPiece,
        position: {
          ...currentPiece.position,
          x: currentPiece.position.x + 1
        }
      });
    }
  }, [currentPiece, board, checkCollision, isPaused, gameOver]);

  // Szybszy ruch w dół (soft drop)
  const moveDown = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;
    
    if (!checkCollision(currentPiece, board, 0, 1)) {
      setCurrentPiece({
        ...currentPiece,
        position: {
          ...currentPiece.position,
          y: currentPiece.position.y + 1
        }
      });
    } else {
      // Jeśli kolizja w dół, umieść klocek na planszy
      placePiece();
    }
  }, [currentPiece, board, checkCollision, isPaused, gameOver]);

  // Natychmiastowy spadek (hard drop)
  const hardDrop = useCallback(() => {
    if (!currentPiece || isPaused || gameOver) return;
    
    let dropDistance = 0;
    while (!checkCollision(currentPiece, board, 0, dropDistance + 1)) {
      dropDistance++;
    }
    
    setCurrentPiece({
      ...currentPiece,
      position: {
        ...currentPiece.position,
        y: currentPiece.position.y + dropDistance
      }
    });
    
    // Od razu umieść klocek po hard dropie
    placePiece(dropDistance);
  }, [currentPiece, board, checkCollision, isPaused, gameOver]);

  // Umieszczenie klocka na planszy
  const placePiece = useCallback((dropDistance = 0) => {
    if (!currentPiece) return;
    
    // Stwórz kopię planszy
    const newBoard = [...board.map(row => [...row])];
    
    // Dodaj aktualny klocek do planszy
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x] !== 0) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          
          // Sprawdź czy wyszliśmy poza górną granicę - game over
          if (boardY < 0) {
            setGameOver(true);
            return;
          }
          
          newBoard[boardY][boardX] = TETROMINOES[currentPiece.type].color;
        }
      }
    }
    
    // Zaktualizuj planszę
    setBoard(newBoard);
    
    // Jeśli był hard drop, dodaj punkty za szybkość
    if (dropDistance > 0) {
      setScore(prevScore => prevScore + dropDistance);
    }
    
    // Sprawdź, czy są pełne linie do usunięcia
    checkLines(newBoard);
    
    // Przejdź do następnego klocka
    setCurrentPiece(nextPiece);
    setNextPiece(generateRandomTetromino());
  }, [board, currentPiece, nextPiece, generateRandomTetromino]);

  // Sprawdzanie i usuwanie pełnych linii
  const checkLines = useCallback((boardState: BoardState) => {
    let linesCleared = 0;
    const newBoard = boardState.filter(row => {
      const isLineComplete = row.every(cell => cell !== null);
      if (isLineComplete) linesCleared++;
      return !isLineComplete;
    });
    
    // Dodaj nowe puste linie na górze
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }
    
    if (linesCleared > 0) {
      // Aktualizuj punkty, linie i poziom
      const newLines = lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;
      const pointsScored = POINTS_PER_LINE * linesCleared * (linesCleared > 1 ? linesCleared : 1);
      
      setBoard(newBoard);
      setScore(prevScore => prevScore + pointsScored);
      setLines(newLines);
      
      // Zwiększanie poziomu i prędkości
      if (newLevel > level) {
        setLevel(newLevel);
        const newSpeed = Math.max(MAX_SPEED, INITIAL_SPEED - (newLevel - 1) * SPEED_INCREMENT);
        setSpeed(newSpeed);
      }
    }
  }, [lines, level]);

  // Obsługa cyklu gry
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const gameInterval = setInterval(() => {
      moveDown();
    }, speed);

    return () => {
      clearInterval(gameInterval);
    };
  }, [gameStarted, gameOver, moveDown, speed, isPaused]);

  // Obsługa klawiatury
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (event.code) {
        case 'ArrowLeft':
          event.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          event.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          event.preventDefault();
          rotatePiece();
          break;
        case 'Space':
          event.preventDefault();
          hardDrop();
          break;
        case 'KeyP':
          event.preventDefault();
          togglePause();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, moveLeft, moveRight, moveDown, rotatePiece, hardDrop]);

  // Renderowanie komórki planszy
  const renderCell = (x: number, y: number) => {
    let cellContent = board[y][x];
    
    // Sprawdź czy aktualny klocek jest na tej pozycji
    if (currentPiece && !isPaused) {
      for (let pieceY = 0; pieceY < currentPiece.shape.length; pieceY++) {
        for (let pieceX = 0; pieceX < currentPiece.shape[pieceY].length; pieceX++) {
          if (
            currentPiece.shape[pieceY][pieceX] !== 0 &&
            currentPiece.position.x + pieceX === x &&
            currentPiece.position.y + pieceY === y
          ) {
            cellContent = TETROMINOES[currentPiece.type].color;
          }
        }
      }
    }
    
    // Oblicz pozycję ghost piece (cień pokazujący gdzie spadnie klocek)
    let isGhostCell = false;
    if (currentPiece && !isPaused && !gameOver) {
      let ghostY = 0;
      while (!checkCollision(
        {
          ...currentPiece,
          position: { ...currentPiece.position, y: currentPiece.position.y + ghostY + 1 }
        },
        board
      )) {
        ghostY++;
      }
      
      for (let pieceY = 0; pieceY < currentPiece.shape.length; pieceY++) {
        for (let pieceX = 0; pieceX < currentPiece.shape[pieceY].length; pieceX++) {
          if (
            currentPiece.shape[pieceY][pieceX] !== 0 &&
            currentPiece.position.x + pieceX === x &&
            currentPiece.position.y + pieceY + ghostY === y &&
            cellContent === null // Nie nadpisuj aktualnego klocka
          ) {
            isGhostCell = true;
          }
        }
      }
    }
    
    return (
      <div
        key={`${x}-${y}`}
        className={`aspect-square
          ${cellContent ? 'border border-white/20' : 'border border-gray-800'}
          ${isGhostCell ? 'border-2 border-white/30' : ''}
        `}
        style={{
          backgroundColor: cellContent || (isGhostCell ? 'rgba(255, 255, 255, 0.1)' : 'transparent')
        }}
      />
    );
  };

  // Renderowanie miniaturki następnego klocka
  const renderNextPiece = () => {
    if (!nextPiece) return null;
    
    const shape = nextPiece.shape;
    const color = TETROMINOES[nextPiece.type].color;
    
    // Oblicz wymiary kształtu
    const height = shape.length;
    const width = shape[0].length;
    
    return (
      <div className="grid gap-1" style={{ 
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`
      }}>
        {shape.flat().map((cell, index) => (
          <div
            key={index}
            className={`aspect-square ${cell ? 'border border-white/20' : ''}`}
            style={{
              backgroundColor: cell ? color : 'transparent'
            }}
          />
        ))}
      </div>
    );
  };

  // Ekran startowy
  const renderStartScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col items-center py-8 px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Zagraj w <span className="text-[#00BD95]">Tetris</span>
      </h2>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        className="px-6 py-3 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg transition-colors text-base md:text-lg shadow-xl"
      >
        Start Game
      </motion.button>
    </motion.div>
  );

  // Ekran końca gry
  const renderGameOverScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4 text-center">
        Game <span className="text-[#00BD95]">Over</span>
      </h2>
      
      <p className="text-white text-lg md:text-xl mb-2">Score: {score}</p>
      <p className="text-white text-lg md:text-xl mb-6">Lines: {lines}</p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        className="px-6 py-3 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg transition-colors text-base md:text-lg"
      >
        Play Again
      </motion.button>
    </motion.div>
  );

  // Ekran pauzy
  const renderPauseScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Game <span className="text-[#00BD95]">Paused</span>
      </h2>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePause}
        className="px-6 py-3 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg transition-colors text-base md:text-lg"
      >
        Resume Game
      </motion.button>
    </motion.div>
  );

  // Panel kontrolny na urządzeniach mobilnych
  const renderMobileControls = () => (
    <div className="grid grid-cols-3 gap-2 md:gap-3 mt-6 w-full max-w-md mx-auto">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={moveLeft}
        className="p-3 bg-gray-800 rounded-lg text-white flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={hardDrop}
        className="p-3 bg-gray-800 rounded-lg text-white flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.button>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={moveRight}
        className="p-3 bg-gray-800 rounded-lg text-white flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={moveDown}
        className="col-span-2 p-3 bg-gray-800 rounded-lg text-white flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={rotatePiece}
        className="p-3 bg-gray-800 rounded-lg text-white flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </motion.button>
    </div>
  );

  // Główny ekran gry
  const renderGame = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto px-4 relative"
    >
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Panel informacyjny i następny klocek */}
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Statystyki</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Score</p>
                <p className="text-white text-xl font-semibold">{score}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Level</p>
                <p className="text-white text-xl font-semibold">{level}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Lines</p>
                <p className="text-white text-xl font-semibold">{lines}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Następny klocek</h3>
            <div className="aspect-square w-24 flex items-center justify-center mx-auto mb-2">
              {renderNextPiece()}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePause}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              {isPaused ? "Resume" : "Pause"}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-4 py-2 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg transition-colors text-sm"
            >
              New Game
            </motion.button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Sterowanie</h3>
            <ul className="text-sm text-gray-300">
              <li className="mb-1">↑ - Obrót</li>
              <li className="mb-1">← → - Ruch</li>
              <li className="mb-1">↓ - Szybszy spadek</li>
              <li className="mb-1">Space - Natychmiastowy spadek</li>
              <li className="mb-1">P - Pauza</li>
            </ul>
          </div>
        </div>
        
        {/* Plansza gry */}
        <div className="relative w-full md:w-2/3">
          <div className="border-2 border-gray-700 rounded-lg overflow-hidden bg-gray-900/50">
            <div 
              className="grid gap-0" 
              style={{ 
                gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
                gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
              }}
            >
              {board.map((row, y) =>
                row.map((_, x) => renderCell(x, y))
              )}
            </div>
          </div>
          
          {/* Nakładki dla pauzy i game over */}
          {isPaused && renderPauseScreen()}
          {gameOver && renderGameOverScreen()}
        </div>
      </div>
      
      {/* Mobilne sterowanie jest widoczne tylko na mniejszych ekranach */}
      <div className="md:hidden">
        {renderMobileControls()}
      </div>
    </motion.div>
  );

  return (
    <div className=" flex flex-col items-center justify-center bg-[#171c22] p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center">
        <span className="text-[#00BD95]">Te</span>tris
      </h1>
      
      {!gameStarted ? renderStartScreen() : renderGame()}
    </div>
  );
};

export default Tetris;