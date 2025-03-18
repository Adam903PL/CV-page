// components/TicTacToe.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Definicje typów
type Player = "X" | "O" | null;
type BoardState = (Player)[];

const TicTacToe = () => {
  // Stan wyboru symbolu gracza
  const [userSymbol, setUserSymbol] = useState<Player>(null);
  const [computerSymbol, setComputerSymbol] = useState<Player>(null);
  
  // Stan planszy
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  
  // Stan gry
  const [currentPlayer, setCurrentPlayer] = useState<Player>(null);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  
  // Linie wygrywające
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // poziome
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // pionowe
    [0, 4, 8], [2, 4, 6],            // ukośne
  ];

  // Funkcja do wyboru symbolu przez gracza
  const chooseSymbol = (symbol: Player) => {
    if (symbol === "X") {
      setUserSymbol("X");
      setComputerSymbol("O");
      setCurrentPlayer("X"); // Gracz X zaczyna
    } else {
      setUserSymbol("O");
      setComputerSymbol("X");
      setCurrentPlayer("X"); // Zawsze zaczyna X
    }
    setGameStarted(true);
  };

  // Sprawdź czy gra się zakończyła po ruchu komputera
  useEffect(() => {
    if (gameStarted && currentPlayer === computerSymbol) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500); // Małe opóźnienie dla lepszego UX
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameStarted, computerSymbol]);

  // Sprawdzanie czy jest zwycięzca po każdym ruchu
  useEffect(() => {
    if (!gameStarted) return;
    
    checkGameStatus();
  }, [board, gameStarted]);

  // Sprawdź stan gry
  const checkGameStatus = () => {
    // Sprawdź czy jest zwycięzca
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningLine(pattern);
        return;
      }
    }

    // Sprawdź czy jest remis
    if (!board.includes(null)) {
      setWinner("draw");
    }
  };

  // Algorytm minimax do wyboru najlepszego ruchu komputera
  const minimax = (newBoard: BoardState, player: Player, depth: number = 0, isMaximizing: boolean = true): number => {
    // Sprawdź czy gra się zakończyła
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a] === computerSymbol ? 10 - depth : depth - 10;
      }
    }

    // Sprawdź czy jest remis
    if (!newBoard.includes(null)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = computerSymbol;
          const score = minimax(newBoard, player, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = userSymbol;
          const score = minimax(newBoard, player, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Ruch komputera
  const makeComputerMove = () => {
    if (winner) return;

    // Znajdź najlepszy ruch za pomocą algorytmu minimax
    let bestScore = -Infinity;
    let bestMove = -1;
    
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        // Wykonaj ruch
        const newBoard = [...board];
        newBoard[i] = computerSymbol;
        
        // Oblicz wynik dla tego ruchu
        const score = minimax(newBoard, computerSymbol, 0, false);
        
        // Jeśli ten ruch jest lepszy niż najlepszy znaleziony dotąd
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    
    // Wykonaj najlepszy ruch
    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = computerSymbol;
      setBoard(newBoard);
      setCurrentPlayer(userSymbol);
    }
  };

  // Obsługa ruchu gracza
  const handlePlayerMove = (index: number) => {
    if (board[index] !== null || winner || currentPlayer !== userSymbol) return;
    
    const newBoard = [...board];
    newBoard[index] = userSymbol;
    setBoard(newBoard);
    setCurrentPlayer(computerSymbol);
  };

  // Reset gry
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine(null);
    setCurrentPlayer(userSymbol === "O" ? "X" : userSymbol); // Zawsze zaczyna X
  };

  // Powrót do wyboru symbolu
  const backToSymbolChoice = () => {
    resetGame();
    setUserSymbol(null);
    setComputerSymbol(null);
    setGameStarted(false);
  };

  // Renderowanie komórki planszy
  const renderCell = (index: number) => {
    const value = board[index];
    const isWinningCell = winningLine?.includes(index);
    
    return (
        <motion.div
        key={index}
        whileHover={{ scale: value ? 1 : 1.05 }}
        className={`aspect-square flex items-center justify-center bg-gray-800 rounded-lg cursor-pointer
          ${isWinningCell ? "ring-4 ring-[#00BD95]" : ""}
          text-4xl md:text-6xl lg:text-7xl`}
        onClick={() => handlePlayerMove(index)}
      >
        {value === "X" && (
          <motion.svg 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isWinningCell ? "#00FFC9" : "currentColor"}
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </motion.svg>
        )}
        {value === "O" && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isWinningCell ? "#00FFC9" : "currentColor"}
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="8" />
          </motion.svg>
        )}
      </motion.div>
    );
  };

  // Ekran wyboru symbolu
  const renderSymbolChoice = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col items-center py-8 px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Choose your <span className="text-[#00BD95]">symbol</span>
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => chooseSymbol("X")}
          className="p-4 md:p-6 bg-gray-800 rounded-xl flex flex-col items-center justify-center shadow-xl hover:shadow-[0_5px_15px_rgba(0,_189,_149,_0.4)] transition-all"
        >
          <svg className="w-20 h-20 text-[#00BD95]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
          <span className="text-white mt-2 md:mt-4 font-medium text-sm md:text-base">Play as X</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => chooseSymbol("O")}
          className="p-4 md:p-6 bg-gray-800 rounded-xl flex flex-col items-center justify-center shadow-xl hover:shadow-[0_5px_15px_rgba(0,_189,_149,_0.4)] transition-all"
        >
          <svg className="w-20 h-20 text-[#00BD95]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="8" />
          </svg>
          <span className="text-white mt-2 md:mt-4 font-medium text-sm md:text-base">Play as O</span>
        </motion.button>
      </div>
    </motion.div>
  );

  // Ekran gry
  const renderGame = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
        <div className="bg-gray-800 rounded-lg p-3 md:p-4 w-full md:w-auto">
          <p className="text-gray-400 text-xs md:text-sm">Your Symbol</p>
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
            {userSymbol === "X" ? (
              <svg className="w-8 h-8 text-[#00BD95]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-[#00BD95]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8" />
              </svg>
            )}
          </div>
        </div>
        
        <div className="text-center order-first md:order-none">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
            {winner 
              ? winner === "draw" 
                ? "Draw!" 
                : `Winner: ${winner === userSymbol ? "You" : "Computer"}!`
              : `Turn: ${currentPlayer === userSymbol ? "Your" : "Computer's"}`
            }
          </h3>
          {!winner && currentPlayer === userSymbol && (
            <p className="text-[#00BD95] text-sm md:text-base">Your turn</p>
          )}
          {!winner && currentPlayer === computerSymbol && (
            <p className="text-gray-400 text-sm md:text-base">Computer is thinking...</p>
          )}
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3 md:p-4 w-full md:w-auto">
          <p className="text-gray-400 text-xs md:text-sm">Computer</p>
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
            {computerSymbol === "X" ? (
              <svg className="w-8 h-8 text-[#00BD95]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-[#00BD95]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8" />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6 md:mb-8">
        {Array(9).fill(null).map((_, index) => renderCell(index))}
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="px-4 py-2 md:px-6 md:py-3 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg transition-colors text-sm md:text-base"
        >
          New Game
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={backToSymbolChoice}
          className="px-4 py-2 md:px-6 md:py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-sm md:text-base"
        >
          Change Symbol
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className=" flex flex-col items-center justify-center bg-[#171c22] p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center">
        Tic Tac <span className="text-[#00BD95]">Toe</span>
      </h1>
      
      {!gameStarted ? renderSymbolChoice() : renderGame()}
    </div>
  );
};

export default TicTacToe;


