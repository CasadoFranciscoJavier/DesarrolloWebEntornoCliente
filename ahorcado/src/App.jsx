import { useState, useEffect } from 'react';
// import './App.css'; 
import part0 from './img/0.jpg';
import part1 from './img/1.jpg';
import part2 from './img/2.jpg';
import part3 from './img/3.jpg';
import part4 from './img/4.jpg';
import part5 from './img/5.jpg';
import part6 from './img/6.jpg';

const WORD_LIST = ['REACT', 'VITE', 'ESTADO', 'PIÑATA', 'MONTAÑA', 'JAVASCRIPT', 'TECLADO'];
const MAX_MISTAKES = 6;

function getRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export default function Hangman() {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const incorrectLetters = guessedLetters.filter(letter => !word.includes(letter));
  const correctLetters = guessedLetters.filter(letter => word.includes(letter));

  const partsImages = [part0, part1, part2, part3, part4, part5, part6];

  const displayWord = word.split('').map((letter, index) => (
    <span key={index} className="letter-placeholder">
      {correctLetters.includes(letter) ? letter : '_ '}
    </span>
  ));

  const isWinner = word.split('').every(letter => correctLetters.includes(letter));
  const isLoser = incorrectLetters.length >= MAX_MISTAKES;
  const isGameOver = isWinner || isLoser;

  function handleGuess(letter) {
    if (isGameOver || guessedLetters.includes(letter)) {
      return;
    }
    const newGuessedLetters = guessedLetters.slice();
    newGuessedLetters.push(letter);
    setGuessedLetters(newGuessedLetters);


    // tambien se podria hacer esto:
    // const newGuessedLetters = [...guessedLetters, letter];
    // setGuessedLetters(newGuessedLetters);
  }

  function resetGame() {
    setWord(getRandomWord());
    setGuessedLetters([]);
  }

  const keyboardLayout = 'ABCDEFGHIJKLMN\u00d1OPQRSTUVWXYZ';

  const keyboard = keyboardLayout.split('').map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && word.includes(letter);

    return (
      <button
        key={letter}
        onClick={() => handleGuess(letter)}
        disabled={isGuessed || isGameOver}
      // className={`key ${isCorrect ? 'correct' : isGuessed ? 'incorrect' : ''}`}
      >
        {letter}
      </button>
    );
  });

  const currentMistakes = incorrectLetters.length;
  const imageIndex = Math.min(currentMistakes, MAX_MISTAKES);
  const currentImageSrc = partsImages[imageIndex];

  return (
    <div className="hangman-container">
      <h1>El Ahorcado</h1>

      <div className="status-area">
        <div className="hangman-visual">
          <img
            src={currentImageSrc}
            alt={`Ahorcado: ${currentMistakes} errores`}
            className="hangman-drawing"
            style={{ width: '200px', height: '200px' }}
          />
        </div>
        <p className="mistakes-info">
          Errores: {currentMistakes} / {MAX_MISTAKES}
        </p>

        {/* 
        let letrasFalladasString = '';

        for (let i = 0; i < incorrectLetters.length; i++) {
          letrasFalladasString += incorrectLetters[i];

                if (i < incorrectLetters.length - 1) {
                  letrasFalladasString += ', ';
            }
        }

        return (
        <p className="incorrect-info">
          Letras Falladas: {letrasFalladasString}
        </p>
        ); */}

        <p className="incorrect-info">
          Letras Falladas: {incorrectLetters.join(', ')}
        </p>
      </div>

      <div className="word-display">{displayWord}</div>

      {isGameOver && (
        <div>
          <h2>{isWinner ? '¡GANASTE! 🎉' : '¡PERDISTE! 😢'}</h2>
          <p>La palabra era: {word}</p>
          <button onClick={resetGame}>Jugar de Nuevo</button>
        </div>
      )}

      <div className="keyboard-area">
        {!isGameOver && keyboard}
      </div>
    </div>
  );
}