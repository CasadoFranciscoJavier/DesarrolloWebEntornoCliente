import { useState, useEffect } from 'react';
import './App.css'; 

// Lista de palabras 
const WORD_LIST = ['REACT', 'VITE', 'ESTADO', 'PIÑATA', 'MONTAÑA', 'JAVASCRIPT', 'TECLADO'];

// Máximo de errores permitidos (para dibujar 6 partes del cuerpo)
const MAX_MISTAKES = 6;


function getRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export default function Hangman() {
  // --- VARIABLES DE ESTADO ---
  const [word, setWord] = useState(getRandomWord()); // Palabra secreta
  const [guessedLetters, setGuessedLetters] = useState([]); // Array de letras probadas
  const [mistakes, setMistakes] = useState(0); // Contador de errores
  
  // Letras incorrectas (Errores) y correctas
  const incorrectLetters = guessedLetters.filter(letter => !word.includes(letter));
  const correctLetters = guessedLetters.filter(letter => word.includes(letter));

  // --- LÓGICA DEL JUEGO ---

  // 1. Mostrar la palabra con guiones
  const displayWord = word.split('').map((letter, index) => (
    <span key={index} className="letter-placeholder">
      {correctLetters.includes(letter) ? letter : '_'}
    </span>
  ));

  // 2. Comprobar si se gana o se pierde
  const isWinner = word.split('').every(letter => correctLetters.includes(letter));
  const isLoser = incorrectLetters.length >= MAX_MISTAKES;
  const isGameOver = isWinner || isLoser;

  // 3. Función principal al hacer click en una letra
  function handleGuess(letter) {
    // Si el juego termina o la letra ya se probó, salimos
    if (isGameOver || guessedLetters.includes(letter)) {
      return;
    }

    // Añadimos la letra a la lista de letras probadas
    setGuessedLetters([...guessedLetters, letter]);

    // Si la letra NO está en la palabra secreta, sumamos un error
    if (!word.includes(letter)) {
      setMistakes(mistakes + 1);
    }
  }

  // 4. Función para reiniciar
  function resetGame() {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setMistakes(0);
  }

  // 5. Teclado de botones (A-Z y \ñ)
  const keyboardLayout = 'ABCDEFGHIJKLMN\u00d1OPQRSTUVWXYZ';
  const keyboard = keyboardLayout.split('').map(letter => (
    <button
      key={letter}
      onClick={() => handleGuess(letter)}
      disabled={guessedLetters.includes(letter) || isGameOver}
      className={`key ${guessedLetters.includes(letter) ? 'guessed' : ''} ${word.includes(letter) ? 'correct' : 'incorrect'}`}
    >
      {letter}
    </button>
  ));

  // 6. Dibujo simple del ahorcado (usando un Array como hiciste con el Tres en Raya)
  const hangmanParts = [
    'O',    // Cabeza (1 error)
    '|',    // Cuerpo (2 errores)
    '/',    // Brazo izquierdo (3 errores)
    '\\',   // Brazo derecho (4 errores)
    '/',    // Pierna izquierda (5 errores)
    '\\'    // Pierna derecha (6 errores)
  ];

  // Mostramos el dibujo uniendo las partes según los errores
  const hangmanVisual = hangmanParts.slice(0, incorrectLetters.length).join('');

  // --- RENDERIZADO ---
  return (
    <div className="hangman-container">
      <h1>El Ahorcado</h1>

      <div className="status-area">
        {/* Mostramos el dibujo y el contador de errores */}
        <div className="hangman-visual">
            <span className="drawing-text">Estructura: ┬|</span>
            <span className="drawing-parts">{hangmanVisual}</span>
        </div>
        <p className="mistakes-info">
            Errores: {incorrectLetters.length} / {MAX_MISTAKES}
        </p>
        <p className="incorrect-info">
            Letras Falladas: {incorrectLetters.join(', ')}
        </p>
      </div>

      <div className="word-display">{displayWord}</div>

      {isGameOver && (
        <div className={`message ${isWinner ? 'win' : 'lose'}`}>
          <h2>{isWinner ? '¡GANASTE! 🎉' : '¡PERDISTE! 😢'}</h2>
          <p>La palabra era: **{word}**</p>
          <button onClick={resetGame}>Jugar de Nuevo</button>
        </div>
      )}

      <div className="keyboard-area">
        {!isGameOver && keyboard}
      </div>
    </div>
  );
}