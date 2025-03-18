// components/MemoryGame.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Define card types
type Card = {
  id: number;
  iconPath: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const MemoryGame = () => {
  // Game state
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  // Icons for the memory game
  const icons = [
    "/img/icons/react-js-icon.svg",
    "/img/icons/zustand.svg",
    "/img/icons/redux.svg",
    "/img/icons/javascript-programming-language-icon.svg",
    "/img/icons/typescript-programming-language-icon.svg",
    "/img/icons/nextjs-icon.svg",
    "/img/icons/tailwind-css-icon.svg",
    "/img/icons/node-js-icon.svg",
    "/img/icons/git-icon.svg",
    "/img/icons/html-icon.svg",
    "/img/icons/c-plus-plus-programming-language-icon.svg",
    "/img/icons/python-programming-language-icon.svg",
  ];

  // Initialize game
  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...icons, ...icons].map((iconPath, index) => ({
      id: index,
      iconPath,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle the cards
    const shuffledCards = shuffleArray(cardPairs);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setGameStarted(true);
  };

  // Shuffle array function (Fisher-Yates algorithm)
  const shuffleArray = (array: Card[]): Card[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Start timer on first move
    if (!startTime) {
      setStartTime(Date.now());
    }

    // Don't allow more than 2 cards flipped at once
    if (flippedCards.length === 2) return;

    // Don't allow clicking on already matched or flipped cards
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isMatched || flippedCards.includes(id)) return;

    // Flip the card
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Update the cards state to reflect the flip
    setCards(
      cards.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    // Check for match if we have 2 cards flipped
    if (newFlippedCards.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.iconPath === secondCard.iconPath) {
        // We have a match
        setCards(
          cards.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(prevMatchedPairs => prevMatchedPairs + 1);
        setFlippedCards([]);
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setCards(
            cards.map(card => 
              newFlippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check if game is completed
  useEffect(() => {
    if (matchedPairs === icons.length && gameStarted) {
      setGameCompleted(true);
      setEndTime(Date.now());
    }
  }, [matchedPairs, gameStarted, icons.length]);

  // Format time function
  const formatTime = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Render welcome screen
  const renderWelcomeScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col items-center py-8 px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
        Memory <span className="text-[#00BD95]">Game</span>
      </h2>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={initializeGame}
        className="px-6 py-3 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg transition-colors text-lg shadow-xl hover:shadow-[0_5px_15px_rgba(0,_189,_149,_0.4)]"
      >
        Start Game
      </motion.button>
    </motion.div>
  );

  // Render game completed screen
  const renderGameCompletedScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto flex flex-col items-center py-8 px-4"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
        <span className="text-[#00BD95]">Congratulations!</span>
      </h2>
      
      <p className="text-white text-lg mb-2">You completed the game in:</p>
      <p className="text-[#00BD95] text-2xl font-bold mb-4">
        {startTime && endTime ? formatTime(endTime - startTime) : ""}
      </p>
      
      <p className="text-white text-lg mb-2">Total moves:</p>
      <p className="text-[#00BD95] text-2xl font-bold mb-6">
        {moves}
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={initializeGame}
        className="px-6 py-3 bg-[#00BD95] hover:bg-[#00FFC9] text-white font-semibold rounded-lg transition-colors text-lg shadow-xl hover:shadow-[0_5px_15px_rgba(0,_189,_149,_0.4)] mb-4"
      >
        Play Again
      </motion.button>
    </motion.div>
  );

  // Render card
  const renderCard = (card: Card) => (
    <motion.div
      key={card.id}
      whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
      className={`aspect-square flex items-center justify-center bg-gray-800 rounded-lg cursor-pointer overflow-hidden
        ${card.isMatched ? "ring-4 ring-[#00BD95]" : ""}
      `}
      onClick={() => handleCardClick(card.id)}
    >
      {(card.isFlipped || card.isMatched) ? (
        <motion.div
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex items-center justify-center p-2"
        >
          <img 
            src={card.iconPath} 
            alt="Card" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full bg-gray-700 flex items-center justify-center"
        >
          <svg className="w-12 h-12 text-[#00BD95] opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );

  // Render game board
  const renderGameBoard = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
        <div className="bg-gray-800 rounded-lg p-3 md:p-4 w-full md:w-auto">
          <p className="text-gray-400 text-xs md:text-sm">Moves</p>
          <p className="text-white text-lg md:text-xl font-bold">{moves}</p>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
            Memory <span className="text-[#00BD95]">Game</span>
          </h3>
          <p className="text-[#00BD95] text-sm md:text-base">
            {matchedPairs} / {icons.length} matches
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3 md:p-4 w-full md:w-auto">
          <p className="text-gray-400 text-xs md:text-sm">Time</p>
          <p className="text-white text-lg md:text-xl font-bold">
            {startTime ? formatTime(Date.now() - startTime) : "0:00"}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3 mb-6 md:mb-8">
        {cards.map(card => renderCard(card))}
      </div>
      
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={initializeGame}
          className="px-4 py-2 md:px-6 md:py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-sm md:text-base"
        >
          Restart Game
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className=" flex flex-col items-center justify-center bg-[#171c22] p-x4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 text-center">
        Memory <span className="text-[#00BD95]">Game</span>
      </h1>
      
      {!gameStarted ? renderWelcomeScreen() : 
       gameCompleted ? renderGameCompletedScreen() :
       renderGameBoard()}
    </div>

  );
};

export default MemoryGame;