import { useState } from 'react';

// ------------------------------------------------------------------
// 1. COMPONENTE SQUARE (El mismo)
// ------------------------------------------------------------------
function Square({ value, onSquareClick, squareIndex }) {
  const row = Math.floor(squareIndex / 8); 
  const col = squareIndex % 8;           
  const isDarkSquare = (row + col) % 2 !== 0; 
  const color = isDarkSquare ? '#444' : '#eee'; 
  
  let pieceType = '';
  if (value === 'N' || value === 'DN') pieceType = 'N';
  else if (value === 'B' || value === 'DB') pieceType = 'B';
  
  const pieceColor = (pieceType === 'N') ? 'black' : (pieceType === 'B' ? 'red' : 'transparent');
  const pieceText = (value === 'DN' || value === 'DB') ? '👑' : '';

  const buttonStyle = {
    width: '100%', height: '100%', border: 'none', background: 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  };
  
  const pieceStyle = {
      backgroundColor: pieceColor,
      borderRadius: '50%',
      width: '80%',
      height: '80%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '900',
      boxShadow: (value && isDarkSquare) ? '0 0 5px rgba(0,0,0,0.5)' : 'none'
  };

  return (
    <div style={{ backgroundColor: color, height: '50px', width: '50px', display: 'flex' }}>
      <button 
        className="square" 
        onClick={onSquareClick}
        style={buttonStyle}
      >
          <div style={pieceStyle}>
             {pieceText}
          </div>
      </button>
    </div>
  );
}

// ------------------------------------------------------------------
// 2. FUNCIÓN DE INICIALIZACIÓN (Mismo inicializador)
// ------------------------------------------------------------------
function initializeDamaBoard() {
  const squares = Array(64).fill(null);
  for (let i = 0; i < 24; i++) {
    const row = Math.floor(i / 8);
    const col = i % 8;
    if ((row + col) % 2 !== 0) { squares[i] = "N"; }
  }
  for (let i = 40; i < 64; i++) {
     const row = Math.floor(i / 8);
     const col = i % 8;
     if ((row + col) % 2 !== 0) { squares[i] = "B"; }
  }
  return squares;
}

// ------------------------------------------------------------------
// 3. COMPONENTE BOARD PRINCIPAL (¡Lógica de Dama AÑADIDA!)
// ------------------------------------------------------------------
export default function Board() {
  const initialSquares = initializeDamaBoard();
  const [squares, setSquares] = useState(initialSquares);
  const [turnoN, setTurnoN] = useState(true);
  const [history, setHistory] = useState([initialSquares]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  // Lógica de DAMA: Verifica si el camino entre dos puntos es claro (solo para damas)
  const isPathClear = (start, end, currentSquares) => {
    const rowStart = Math.floor(start / 8);
    const colStart = start % 8;
    const rowEnd = Math.floor(end / 8);
    const colEnd = end % 8;

    const rowDir = rowEnd > rowStart ? 1 : -1;
    const colDir = colEnd > colStart ? 1 : -1;

    let enemiesFound = 0;
    let enemyIndex = -1;

    // Recorrer la diagonal paso a paso
    for (let r = rowStart + rowDir, c = colStart + colDir; r !== rowEnd; r += rowDir, c += colDir) {
        const index = r * 8 + c;
        if (currentSquares[index] !== null) {
            enemiesFound++;
            enemyIndex = index;
        }
    }
    
    // Si no hay enemigos, el camino es claro (movimiento simple)
    if (enemiesFound === 0) return { clear: true, capturedIndex: null };
    
    // Si hay un enemigo y el destino es la casilla justo después de él (captura)
    if (enemiesFound === 1) return { clear: true, capturedIndex: enemyIndex };
    
    // Si hay más de un enemigo, el camino está bloqueado
    return { clear: false, capturedIndex: null };
  };

  // Funciones de historial (simplificadas)
  function retroceder() {
    const historyCopy = history.slice(0, history.length - 1);
    if (historyCopy.length < 1) return; 
    setHistory(historyCopy);
    setSquares(historyCopy[historyCopy.length - 1]);
    setTurnoN(!turnoN);
    setSelectedPiece(null);
  }
  
  function volverAJugadaAnterior(numeroJugada){
    const historyCopy = history.slice(0, numeroJugada + 1);
    setHistory(historyCopy);
    setSquares(history[numeroJugada]);
    setTurnoN(numeroJugada % 2 === 0); 
    setSelectedPiece(null);
  }

  function handleClick(i) {
    const piece = turnoN ? 'N' : 'B';
    const enemy = turnoN ? 'B' : 'N';
    const rowEnd = Math.floor(i / 8);
    const colEnd = i % 8;
    const isDarkSquare = (rowEnd + colEnd) % 2 !== 0;

    if (!isDarkSquare) return;

    // Lógica de SELECCIÓN (igual que antes)
    if (selectedPiece === null) {
      if (squares[i] === piece || squares[i] === `D${piece}`) {
        setSelectedPiece(i);
      }
      return;
    }

    // Si hace clic en la misma pieza o en otra de su color, re-seleccionar
    if (squares[i] === piece || squares[i] === `D${piece}`) {
        setSelectedPiece(i);
        return;
    }

    // Debe ser a casilla vacía
    if (squares[i] !== null) {
        setSelectedPiece(null);
        return;
    }
    
    // Lógica de MOVIMIENTO / CAPTURA
    
    const rowStart = Math.floor(selectedPiece / 8);
    const colStart = selectedPiece % 8;
    const rowDiff = Math.abs(rowEnd - rowStart);
    const colDiff = Math.abs(colEnd - colStart);
    const currentPiece = squares[selectedPiece];
    const isKing = currentPiece === 'DN' || currentPiece === 'DB';

    // Debe ser diagonal
    if (colDiff !== rowDiff || rowDiff === 0) {
        setSelectedPiece(null);
        return;
    }

    let isValid = false;
    let capturedIndex = null;
    let nextSquares = squares.slice();

    // ---------------------------------------------------
    // Lógica de DAMA (Movimiento y Captura a Larga Distancia)
    // ---------------------------------------------------
    if (isKing) {
        const pathCheck = isPathClear(selectedPiece, i, nextSquares);
        if (pathCheck.clear) {
            isValid = true;
            capturedIndex = pathCheck.capturedIndex;
        }
    } 
    // ---------------------------------------------------
    // Lógica de PEÓN (Movimiento y Captura a Corta Distancia)
    // ---------------------------------------------------
    else {
        // CAPTURA DE PEÓN (distancia 2 en diagonal)
        if (rowDiff === 2 && colDiff === 2) {
            const capRow = (rowStart + rowEnd) / 2;
            const capCol = (colStart + colEnd) / 2;
            const capIndex = capRow * 8 + capCol;
            const capPiece = squares[capIndex];

            if (capPiece !== null && (capPiece === enemy || capPiece === `D${enemy}`)) {
                isValid = true;
                capturedIndex = capIndex;
            }
        } 
        // MOVIMIENTO SIMPLE DE PEÓN (distancia 1 en diagonal, hacia adelante)
        else if (rowDiff === 1 && colDiff === 1) {
            const direction = turnoN ? 1 : -1;
            const isMovingForward = (rowEnd - rowStart) === direction;
            if (isMovingForward) {
                isValid = true;
            }
        }
    }

    // ---------------------------------------------------
    // Ejecución del movimiento
    // ---------------------------------------------------
    if (isValid) {
      
      // Mover la ficha
      nextSquares[i] = currentPiece;
      nextSquares[selectedPiece] = null;

      // Eliminar ficha capturada (si aplica)
      if (capturedIndex !== null) {
        nextSquares[capturedIndex] = null;
      }
      
      // Coronación
      if (!isKing && (rowEnd === 7 && turnoN || rowEnd === 0 && !turnoN)) {
        nextSquares[i] = turnoN ? 'DN' : 'DB';
      }

      // Finalizar turno
      setSquares(nextSquares);
      setHistory([...history, nextSquares]);
      setTurnoN(!turnoN);
      setSelectedPiece(null);
      return;
    } 
    
    // Si el movimiento no fue válido
    setSelectedPiece(null);
  }

  // ------------------------------------------------------------------
  // RENDERIZADO DEL TABLERO
  // ------------------------------------------------------------------
  const status = "Siguiente: " + (turnoN ? "Negras (N)" : "Blancas (B)");
  
  return (
    <div className="game-board" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>{status}</h1>
      <p style={{color: 'red'}}>
        **Juego de Damas (Funcional):** Peones capturan a 1. **Damas se mueven y capturan a cualquier distancia diagonal** (si el camino está libre).
        <br/>*(Multi-captura obligatoria aún no implementada).*
      </p>

      {/* RENDERIZADO DINÁMICO DEL TABLERO 8x8 */}
      {Array(8).fill(null).map((_, row) => (
          <div key={row} className="board-row" style={{ display: 'flex' }}>
              {Array(8).fill(null).map((_, col) => {
                  const i = row * 8 + col;
                  return (
                      <Square 
                          key={i} 
                          value={squares[i]} 
                          onSquareClick={() => handleClick(i)} 
                          squareIndex={i}
                      />
                  );
              })}
          </div>
      ))}

      <div className="game-info" style={{ marginTop: '20px' }}>
        <h3>Historial</h3>
        <button onClick={retroceder}>Retroceder</button> 
        {/* Puedes añadir los botones de historial aquí si quieres */}
      </div>
    </div>
  );
}