# 📘 Guía Completa: Context API + useReducer desde CERO

## 🎯 ¿Qué vamos a aprender?

Imagina que tienes varios componentes en tu aplicación y todos necesitan compartir información (como puntos, vida, oro, etc.). En lugar de pasar esa información de padre a hijo a hijo a hijo (muy tedioso), usamos **Context API** para crear un "almacén central" donde todos pueden acceder a esa información.

---

## 📚 Tabla de Contenidos

1. [Conceptos Básicos](#conceptos-básicos)
2. [El Problema que Resuelve](#el-problema-que-resuelve)
3. [Anatomía del Context + Reducer](#anatomía-del-context--reducer)
4. [Paso a Paso: Creando un Context](#paso-a-paso-creando-un-context)
5. [Orden de Ejecución (Debugging)](#orden-de-ejecución-debugging)
6. [Ejemplo Completo: Mini Tower Defense](#ejemplo-completo-mini-tower-defense)
7. [Errores Comunes](#errores-comunes)

---

## 1. Conceptos Básicos

### ¿Qué es Context API?

Es como un **almacén compartido** donde guardas información que varios componentes necesitan. En lugar de pasar props por cada nivel, cualquier componente puede acceder directamente al almacén.

```
❌ SIN Context (Prop Drilling):
App
 └─> Juego (pasas puntos)
      └─> Estadisticas (pasas puntos)
           └─> MostrarPuntos (pasas puntos)

✅ CON Context:
App (Provider envuelve todo)
 ├─> Juego
 ├─> Estadisticas (accede directo a puntos)
 └─> MostrarPuntos (accede directo a puntos)
```

### ¿Qué es useReducer?

Es como `useState` pero para estados **más complejos**. En lugar de hacer `setState(nuevoValor)`, defines **acciones** como "COMPRAR_ESPADA", "ATACAR_ENEMIGO", etc.

```javascript
// Con useState (simple)
const [puntos, setPuntos] = useState(0)
setPuntos(puntos + 10)

// Con useReducer (complejo)
const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
dispatch({ type: 'GANAR_PUNTOS', cantidad: 10 })
```

---

## 2. El Problema que Resuelve

### Escenario: Tower Defense Game

Tienes estos componentes:
- `App.jsx` - Componente principal
- `InfoJuego.jsx` - Muestra puntos y oleada
- `Enemigo.jsx` - Muestra enemigo y botón atacar
- `Mejoras.jsx` - Botones para comprar mejoras

**TODOS** necesitan acceder a:
- Puntos del jugador
- Vida del enemigo
- Daño del jugador
- Y poder modificarlos (atacar, comprar, etc.)

### ❌ Sin Context (Prop Drilling Hell)

```javascript
// App.jsx
function App() {
  const [puntos, setPuntos] = useState(0)
  const [vidaEnemigo, setVidaEnemigo] = useState(100)
  const [danio, setDanio] = useState(10)

  return (
    <InfoJuego puntos={puntos} />
    <Enemigo vidaEnemigo={vidaEnemigo} danio={danio} setPuntos={setPuntos} setVidaEnemigo={setVidaEnemigo} />
    <Mejoras puntos={puntos} danio={danio} setDanio={setDanio} setPuntos={setPuntos} />
  )
}

// InfoJuego.jsx
function InfoJuego({ puntos }) { // Recibe props
  return <h2>Puntos: {puntos}</h2>
}

// Enemigo.jsx
function Enemigo({ vidaEnemigo, danio, setPuntos, setVidaEnemigo }) { // Recibe 4 props!
  const atacar = () => {
    setVidaEnemigo(vidaEnemigo - danio)
    if (vidaEnemigo <= 0) setPuntos(puntos + 10)
  }
  // ...
}
```

**Problemas:**
- Pasas MUCHAS props
- Si añades más estado, tienes que modificar TODOS los componentes
- Código difícil de mantener

### ✅ Con Context + Reducer

```javascript
// GameContext.jsx (Almacén central)
export const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// InfoJuego.jsx
function InfoJuego() {
  const { state } = useContext(GameContext) // ✨ Acceso directo
  return <h2>Puntos: {state.puntos}</h2>
}

// Enemigo.jsx
function Enemigo() {
  const { state, dispatch } = useContext(GameContext) // ✨ Acceso directo

  const atacar = () => {
    dispatch({ type: 'ATACAR_ENEMIGO' }) // ✨ Simple!
  }
  // ...
}
```

**Ventajas:**
- No pasas props
- Código más limpio
- Fácil de mantener
- Todos acceden al mismo estado

---

## 3. Anatomía del Context + Reducer

### 🏗️ Estructura de Archivos

```
src/
├── GameContext.jsx  ← Aquí está la magia
├── App.jsx          ← Envuelve todo con Provider
├── InfoJuego.jsx    ← Usa el contexto
├── Enemigo.jsx      ← Usa el contexto
└── Mejoras.jsx      ← Usa el contexto
```

### 📦 GameContext.jsx (El Almacén)

```javascript
import { createContext, useReducer } from 'react';

// ════════════════════════════════════════════════════════
// PASO 1: Crear el contexto (el almacén vacío)
// ════════════════════════════════════════════════════════
export const GameContext = createContext();
// Esto crea un "espacio" donde guardaremos el estado

// ════════════════════════════════════════════════════════
// PASO 2: Definir el estado inicial
// ════════════════════════════════════════════════════════
const INITIAL_STATE = {
  puntos: 0,
  vidaEnemigo: 100,
  danioJugador: 10
}
// Es como decir: "Al empezar el juego, así están las cosas"

// ════════════════════════════════════════════════════════
// PASO 3: Crear el Provider (el que guarda y comparte)
// ════════════════════════════════════════════════════════
export function GameProvider({ children }) {
  // children = todos los componentes que envuelve

  // ────────────────────────────────────────────────────
  // PASO 3.1: Definir el reducer (las reglas del juego)
  // ────────────────────────────────────────────────────
  function gameReducer(state, action) {
    // state = estado actual
    // action = lo que quieres hacer (ej: atacar, comprar)

    let outputState = state; // Copia del estado

    // Dependiendo de la acción, modificamos el estado
    if (action.type == 'ATACAR_ENEMIGO') {
      outputState = {
        ...state,
        vidaEnemigo: state.vidaEnemigo - state.danioJugador,
        puntos: state.vidaEnemigo <= state.danioJugador ? state.puntos + 10 : state.puntos
      }
    }
    else if (action.type == 'COMPRAR_MEJORA') {
      outputState = {
        ...state,
        danioJugador: state.danioJugador + 5,
        puntos: state.puntos - 50
      }
    }

    return outputState; // Devolvemos el nuevo estado
  }

  // ────────────────────────────────────────────────────
  // PASO 3.2: Usar useReducer
  // ────────────────────────────────────────────────────
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
  // state = estado actual del juego
  // dispatch = función para enviar acciones

  // ────────────────────────────────────────────────────
  // PASO 3.3: Retornar el Provider
  // ────────────────────────────────────────────────────
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
  // value = lo que compartimos (estado y función dispatch)
}
```

### 🎨 App.jsx (Envolver con Provider)

```javascript
import { GameProvider } from './GameContext';
import InfoJuego from './InfoJuego';
import Enemigo from './Enemigo';

export default function App() {
  return (
    // ════════════════════════════════════════════════════════
    // ENVOLVEMOS TODO con GameProvider
    // ════════════════════════════════════════════════════════
    <GameProvider>
      {/* Ahora TODOS estos componentes pueden acceder al estado */}
      <div className='container'>
        <h1>Tower Defense</h1>
        <InfoJuego />
        <Enemigo />
      </div>
    </GameProvider>
  )
}
```

### 📊 InfoJuego.jsx (Usar el Contexto - Solo Leer)

```javascript
import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function InfoJuego() {
  // ════════════════════════════════════════════════════════
  // ACCEDEMOS al contexto con useContext
  // ════════════════════════════════════════════════════════
  const { state } = useContext(GameContext);
  // Destructuramos para obtener solo 'state'
  // No necesitamos 'dispatch' porque solo mostramos info

  return (
    <div>
      <h2>Puntos: {state.puntos}</h2>
      <p>Daño: {state.danioJugador}</p>
    </div>
  )
}
```

### ⚔️ Enemigo.jsx (Usar el Contexto - Leer y Modificar)

```javascript
import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Enemigo() {
  // ════════════════════════════════════════════════════════
  // ACCEDEMOS al contexto con useContext
  // ════════════════════════════════════════════════════════
  const { state, dispatch } = useContext(GameContext);
  // Ahora obtenemos AMBOS: state (para leer) y dispatch (para modificar)

  return (
    <div>
      <h3>Enemigo: {state.vidaEnemigo} HP</h3>

      <button onClick={() => dispatch({ type: 'ATACAR_ENEMIGO' })}>
        Atacar
      </button>

      {/*
        Al hacer click:
        1. Se llama a dispatch({ type: 'ATACAR_ENEMIGO' })
        2. Esto ejecuta el reducer con action.type = 'ATACAR_ENEMIGO'
        3. El reducer calcula el nuevo estado
        4. React actualiza TODOS los componentes que usan ese estado
      */}
    </div>
  )
}
```

---

## 4. Paso a Paso: Creando un Context

### 🔧 PASO A PASO (Como si estuvieras cocinando)

#### Paso 1: Crear el archivo GameContext.jsx

```javascript
import { createContext, useReducer } from 'react';

// 1️⃣ Crear el contexto
export const GameContext = createContext();
```

#### Paso 2: Definir el estado inicial

```javascript
// 2️⃣ ¿Qué información necesita mi juego?
const INITIAL_STATE = {
  puntos: 0,           // Puntos del jugador
  vidaEnemigo: 100,    // Vida del enemigo
  danioJugador: 10,    // Daño que hace el jugador
  oleada: 1            // Oleada actual
}
```

#### Paso 3: Crear el reducer (las reglas)

```javascript
// 3️⃣ ¿Qué acciones puede hacer el jugador?
function gameReducer(state, action) {
  let outputState = state;

  // Acción 1: Atacar enemigo
  if (action.type == 'ATACAR_ENEMIGO') {
    const nuevaVida = state.vidaEnemigo - state.danioJugador;

    // Si muere el enemigo, ganas puntos
    if (nuevaVida <= 0) {
      outputState = {
        ...state,
        vidaEnemigo: 0,
        puntos: state.puntos + 10
      }
    }
    // Si no muere, solo reduces su vida
    else {
      outputState = {
        ...state,
        vidaEnemigo: nuevaVida
      }
    }
  }

  // Acción 2: Comprar mejora
  else if (action.type == 'COMPRAR_MEJORA' && state.puntos >= 50) {
    outputState = {
      ...state,
      danioJugador: state.danioJugador + 5,
      puntos: state.puntos - 50
    }
  }

  // Acción 3: Nueva oleada
  else if (action.type == 'NUEVA_OLEADA') {
    outputState = {
      ...state,
      oleada: state.oleada + 1,
      vidaEnemigo: 100 + (state.oleada * 20) // Más difícil cada vez
    }
  }

  return outputState;
}
```

#### Paso 4: Crear el Provider

```javascript
// 4️⃣ Crear el Provider
export function GameProvider({ children }) {

  // Usar useReducer
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  // Retornar el Provider con el estado
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
```

#### Paso 5: Envolver App con Provider

```javascript
// En App.jsx
import { GameProvider } from './GameContext';

export default function App() {
  return (
    <GameProvider>
      {/* Todo lo que esté aquí puede usar el contexto */}
      <MisComponentes />
    </GameProvider>
  )
}
```

#### Paso 6: Usar el contexto en componentes

```javascript
// En cualquier componente
import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function MiComponente() {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div>
      <p>Puntos: {state.puntos}</p>
      <button onClick={() => dispatch({ type: 'ATACAR_ENEMIGO' })}>
        Atacar
      </button>
    </div>
  )
}
```

---

## 5. Orden de Ejecución (Debugging)

### 🔍 ¿Qué pasa cuando haces click en "Atacar"?

Vamos a seguir el flujo paso por paso, como un debugger:

```
👉 USUARIO: Hace click en botón "Atacar"

📍 Paso 1: onClick ejecuta
─────────────────────────────────────────────────
Archivo: Enemigo.jsx
Línea: <button onClick={() => dispatch({ type: 'ATACAR_ENEMIGO' })}>

console.log('1. Click en atacar')
```

```
📍 Paso 2: Se llama a dispatch
─────────────────────────────────────────────────
Archivo: Enemigo.jsx
Función: dispatch({ type: 'ATACAR_ENEMIGO' })

console.log('2. Enviando acción:', { type: 'ATACAR_ENEMIGO' })
```

```
📍 Paso 3: dispatch llama al reducer
─────────────────────────────────────────────────
Archivo: GameContext.jsx
Función: gameReducer(state, action)

console.log('3. Reducer recibe:')
console.log('   - state:', state)
console.log('   - action:', action)

Ejemplo:
state = { puntos: 20, vidaEnemigo: 100, danioJugador: 10 }
action = { type: 'ATACAR_ENEMIGO' }
```

```
📍 Paso 4: Reducer evalúa la acción
─────────────────────────────────────────────────
Archivo: GameContext.jsx
Línea: if (action.type == 'ATACAR_ENEMIGO') {

console.log('4. Entrando en if ATACAR_ENEMIGO')
```

```
📍 Paso 5: Reducer calcula nuevo estado
─────────────────────────────────────────────────
Archivo: GameContext.jsx
Dentro del if

console.log('5. Calculando nuevo estado:')
const nuevaVida = state.vidaEnemigo - state.danioJugador
console.log('   - Nueva vida enemigo:', nuevaVida) // 100 - 10 = 90

outputState = {
  ...state,
  vidaEnemigo: 90
}
console.log('   - Nuevo estado:', outputState)
```

```
📍 Paso 6: Reducer retorna nuevo estado
─────────────────────────────────────────────────
Archivo: GameContext.jsx
Línea: return outputState

console.log('6. Reducer retorna:', outputState)
```

```
📍 Paso 7: React actualiza el estado
─────────────────────────────────────────────────
Internamente React

console.log('7. React detecta cambio de estado')
console.log('   - Estado anterior:', { vidaEnemigo: 100 })
console.log('   - Estado nuevo:', { vidaEnemigo: 90 })
```

```
📍 Paso 8: React re-renderiza componentes
─────────────────────────────────────────────────
React actualiza TODOS los componentes que usan ese estado

console.log('8. Re-renderizando componentes:')
console.log('   - Enemigo.jsx (usa state.vidaEnemigo)')
console.log('   - InfoJuego.jsx (usa state.puntos)')
```

```
📍 Paso 9: UI se actualiza
─────────────────────────────────────────────────
El navegador muestra los cambios

console.log('9. UI actualizada')
console.log('   - Vida enemigo en pantalla: 90 HP')
```

### 📊 Diagrama Visual del Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                        USUARIO                              │
│                           ↓                                 │
│                    [Click Atacar]                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENTE (Enemigo.jsx)                 │
│                           ↓                                 │
│   dispatch({ type: 'ATACAR_ENEMIGO' })                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  CONTEXT (GameContext.jsx)                  │
│                           ↓                                 │
│   gameReducer(state, action) se ejecuta                    │
│                           ↓                                 │
│   if (action.type == 'ATACAR_ENEMIGO') { ... }            │
│                           ↓                                 │
│   Calcula nuevo estado                                      │
│                           ↓                                 │
│   return outputState                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                         REACT                               │
│                           ↓                                 │
│   Detecta cambio de estado                                 │
│                           ↓                                 │
│   Re-renderiza componentes que usan ese estado             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      PANTALLA (UI)                          │
│                           ↓                                 │
│   Muestra: "Enemigo: 90 HP" (antes era 100)               │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Ejemplo Completo: Mini Tower Defense

Vamos a crear un mini juego paso a paso:

### 📁 GameContext.jsx (Completo con comentarios)

```javascript
import { createContext, useEffect, useReducer } from 'react';

// ════════════════════════════════════════════════════════
// CREAR CONTEXTO
// ════════════════════════════════════════════════════════
export const GameContext = createContext();

// ════════════════════════════════════════════════════════
// ESTADO INICIAL - Como empieza el juego
// ════════════════════════════════════════════════════════
const INITIAL_STATE = {
  // Jugador
  puntos: 0,
  danioJugador: 10,

  // Enemigo
  vidaEnemigo: 100,
  vidaMaxEnemigo: 100,

  // Juego
  oleada: 1,
  juegoIniciado: false,
  juegoPausado: false
}

// ════════════════════════════════════════════════════════
// PROVIDER - El que guarda y comparte el estado
// ════════════════════════════════════════════════════════
export function GameProvider({ children }) {

  // ──────────────────────────────────────────────────────
  // REDUCER - Las reglas del juego
  // ──────────────────────────────────────────────────────
  function gameReducer(state, action) {

    // Siempre empezamos con el estado actual
    let outputState = state;

    // ┌────────────────────────────────────────────────┐
    // │ ACCIÓN: ATACAR_ENEMIGO                         │
    // │ Descripción: El jugador ataca al enemigo      │
    // └────────────────────────────────────────────────┘
    if (action.type == 'ATACAR_ENEMIGO') {
      // Calculamos nueva vida del enemigo
      const nuevaVida = state.vidaEnemigo - state.danioJugador;

      // ¿El enemigo muere?
      if (nuevaVida <= 0) {
        // SÍ - Ganamos puntos y vida = 0
        outputState = {
          ...state,
          vidaEnemigo: 0,
          puntos: state.puntos + 10
        }
      }
      else {
        // NO - Solo reducimos su vida
        outputState = {
          ...state,
          vidaEnemigo: nuevaVida
        }
      }
    }

    // ┌────────────────────────────────────────────────┐
    // │ ACCIÓN: COMPRAR_MEJORA                         │
    // │ Descripción: Mejora el daño del jugador       │
    // │ Requisito: Tener 50 puntos                     │
    // └────────────────────────────────────────────────┘
    else if (action.type == 'COMPRAR_MEJORA' && state.puntos >= 50) {
      outputState = {
        ...state,
        danioJugador: state.danioJugador + 5,
        puntos: state.puntos - 50
      }
    }

    // ┌────────────────────────────────────────────────┐
    // │ ACCIÓN: NUEVA_OLEADA                           │
    // │ Descripción: Genera nuevo enemigo más fuerte  │
    // └────────────────────────────────────────────────┘
    else if (action.type == 'NUEVA_OLEADA') {
      const nuevaVidaMax = 100 + (state.oleada * 20);

      outputState = {
        ...state,
        oleada: state.oleada + 1,
        vidaEnemigo: nuevaVidaMax,
        vidaMaxEnemigo: nuevaVidaMax
      }
    }

    // ┌────────────────────────────────────────────────┐
    // │ ACCIÓN: INICIAR_JUEGO                          │
    // └────────────────────────────────────────────────┘
    else if (action.type == 'INICIAR_JUEGO') {
      outputState = {
        ...state,
        juegoIniciado: true,
        juegoPausado: false
      }
    }

    // ┌────────────────────────────────────────────────┐
    // │ ACCIÓN: PAUSAR_JUEGO                           │
    // └────────────────────────────────────────────────┘
    else if (action.type == 'PAUSAR_JUEGO') {
      outputState = {
        ...state,
        juegoPausado: true
      }
    }

    // ┌────────────────────────────────────────────────┐
    // │ ACCIÓN: REANUDAR_JUEGO                         │
    // └────────────────────────────────────────────────┘
    else if (action.type == 'REANUDAR_JUEGO') {
      outputState = {
        ...state,
        juegoPausado: false
      }
    }

    // IMPORTANTE: Siempre devolvemos el estado
    // (modificado o no modificado)
    return outputState;
  }

  // ──────────────────────────────────────────────────────
  // USEREDUCER - Conectamos el reducer con el estado
  // ──────────────────────────────────────────────────────
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)
  // state = estado actual
  // dispatch = función para enviar acciones

  // ──────────────────────────────────────────────────────
  // USEEFFECT - Lógica automática (cuando enemigo muere)
  // ──────────────────────────────────────────────────────
  useEffect(() => {
    // Si el enemigo muere, pasamos a nueva oleada
    if (state.vidaEnemigo <= 0 && state.juegoIniciado) {
      // Esperamos 1 segundo antes de nueva oleada
      setTimeout(() => {
        dispatch({ type: 'NUEVA_OLEADA' })
      }, 1000);
    }
  }, [state.vidaEnemigo, state.juegoIniciado]);
  // Este efecto se ejecuta cuando vidaEnemigo o juegoIniciado cambian

  // ──────────────────────────────────────────────────────
  // RETURN - Devolvemos el Provider
  // ──────────────────────────────────────────────────────
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
```

### 📁 App.jsx

```javascript
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { GameProvider } from './GameContext';
import InfoJuego from './InfoJuego';
import Enemigo from './Enemigo';
import Mejoras from './Mejoras';
import Controles from './Controles';

export default function App() {
  return (
    // ════════════════════════════════════════════════════════
    // ENVOLVEMOS TODO con GameProvider
    // ════════════════════════════════════════════════════════
    <GameProvider>
      <div className='container'>
        <h1 className='text-center'>Mini Tower Defense</h1>

        {/* Todos estos componentes pueden acceder al estado */}
        <InfoJuego />
        <Enemigo />
        <Mejoras />
        <Controles />
      </div>
    </GameProvider>
  )
}
```

### 📁 InfoJuego.jsx

```javascript
import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function InfoJuego() {
  // ════════════════════════════════════════════════════════
  // ACCEDEMOS AL CONTEXTO
  // ════════════════════════════════════════════════════════
  const { state } = useContext(GameContext);
  // Solo necesitamos 'state' porque solo mostramos información

  return (
    <div className='row'>
      <div className='col-12'>
        <h2>Oleada {state.oleada}</h2>
        <h3>💰 Puntos: {state.puntos}</h3>
        <p>⚔️ Daño: {state.danioJugador}</p>
      </div>
    </div>
  )
}
```

### 📁 Enemigo.jsx

```javascript
import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Enemigo() {
  // ════════════════════════════════════════════════════════
  // ACCEDEMOS AL CONTEXTO
  // ════════════════════════════════════════════════════════
  const { state, dispatch } = useContext(GameContext);
  // Necesitamos 'state' (para leer) y 'dispatch' (para atacar)

  return (
    <div className='row'>
      <div className='col-12'>
        <h3>👾 Enemigo</h3>

        {/* Barra de vida del enemigo */}
        <div className='progress' style={{ height: '30px' }}>
          <div
            className='progress-bar bg-danger'
            style={{ width: `${(state.vidaEnemigo / state.vidaMaxEnemigo) * 100}%` }}
          >
            {state.vidaEnemigo} / {state.vidaMaxEnemigo}
          </div>
        </div>

        <br />

        {/* Botón de atacar */}
        <button
          className='btn btn-danger'
          onClick={() => {
            // ════════════════════════════════════════════════
            // ENVIAMOS ACCIÓN AL REDUCER
            // ════════════════════════════════════════════════
            console.log('🎯 Atacando enemigo...')
            dispatch({ type: 'ATACAR_ENEMIGO' })
          }}
          disabled={!state.juegoIniciado || state.juegoPausado}
        >
          ⚔️ Atacar (-{state.danioJugador} HP)
        </button>
      </div>
    </div>
  )
}
```

### 📁 Mejoras.jsx

```javascript
import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Mejoras() {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div className='row'>
      <div className='col-12'>
        <h3>🛠️ Mejoras</h3>

        <button
          className='btn btn-primary'
          onClick={() => {
            console.log('💪 Comprando mejora...')
            dispatch({ type: 'COMPRAR_MEJORA' })
          }}
          disabled={state.puntos < 50 || !state.juegoIniciado}
        >
          Mejorar Daño (+5)
          <br />
          💰 50 puntos
        </button>
      </div>
    </div>
  )
}
```

### 📁 Controles.jsx

```javascript
import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Controles() {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div className='row'>
      <div className='col-12'>
        <h3>🎮 Controles</h3>

        {/* Botón iniciar */}
        {!state.juegoIniciado && (
          <button
            className='btn btn-success'
            onClick={() => dispatch({ type: 'INICIAR_JUEGO' })}
          >
            ▶️ Iniciar
          </button>
        )}

        {/* Botones pausar/reanudar */}
        {state.juegoIniciado && (
          <>
            {state.juegoPausado ? (
              <button
                className='btn btn-primary'
                onClick={() => dispatch({ type: 'REANUDAR_JUEGO' })}
              >
                ▶️ Reanudar
              </button>
            ) : (
              <button
                className='btn btn-warning'
                onClick={() => dispatch({ type: 'PAUSAR_JUEGO' })}
              >
                ⏸️ Pausar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
```

---

## 7. Errores Comunes

### ❌ Error 1: No envolver con Provider

```javascript
// ❌ MAL
export default function App() {
  return (
    <div>
      <InfoJuego /> {/* ❌ No puede acceder al contexto */}
    </div>
  )
}

// ✅ BIEN
export default function App() {
  return (
    <GameProvider>
      <div>
        <InfoJuego /> {/* ✅ Puede acceder al contexto */}
      </div>
    </GameProvider>
  )
}
```

### ❌ Error 2: Olvidar useContext

```javascript
// ❌ MAL
export default function InfoJuego() {
  return <h2>Puntos: {state.puntos}</h2> // ❌ state no está definido
}

// ✅ BIEN
export default function InfoJuego() {
  const { state } = useContext(GameContext);
  return <h2>Puntos: {state.puntos}</h2> // ✅ Funciona
}
```

### ❌ Error 3: Modificar state directamente

```javascript
// ❌ MAL
const { state, dispatch } = useContext(GameContext);
state.puntos = 100; // ❌ NUNCA modifiques state directamente

// ✅ BIEN
const { state, dispatch } = useContext(GameContext);
dispatch({ type: 'SUMAR_PUNTOS', cantidad: 100 }) // ✅ Usa dispatch
```

### ❌ Error 4: No devolver estado en reducer

```javascript
// ❌ MAL
function gameReducer(state, action) {
  if (action.type == 'ATACAR') {
    state.vida = 50; // ❌ Modificas pero no devuelves
  }
  // ❌ Falta return
}

// ✅ BIEN
function gameReducer(state, action) {
  let outputState = state;

  if (action.type == 'ATACAR') {
    outputState = { ...state, vida: 50 }
  }

  return outputState; // ✅ Siempre devuelves
}
```

### ❌ Error 5: Usar múltiples returns en reducer

```javascript
// ❌ MAL (según el estilo del profesor)
function gameReducer(state, action) {
  if (action.type == 'ATACAR') {
    return { ...state, vida: 50 }; // ❌ Return aquí
  }

  if (action.type == 'COMPRAR') {
    return { ...state, oro: 100 }; // ❌ Return aquí
  }
}

// ✅ BIEN (un solo return)
function gameReducer(state, action) {
  let outputState = state;

  if (action.type == 'ATACAR') {
    outputState = { ...state, vida: 50 };
  }
  else if (action.type == 'COMPRAR') {
    outputState = { ...state, oro: 100 };
  }

  return outputState; // ✅ Un solo return al final
}
```

---

## 🎓 Resumen Final

### Context API + useReducer en 5 pasos:

1. **Crear contexto**: `export const GameContext = createContext()`
2. **Definir estado inicial**: `const INITIAL_STATE = { ... }`
3. **Crear reducer**: `function gameReducer(state, action) { ... }`
4. **Crear Provider**: `export function GameProvider({ children }) { ... }`
5. **Usar en componentes**: `const { state, dispatch } = useContext(GameContext)`

### Cuándo usar Context + Reducer:

- ✅ Cuando muchos componentes necesitan el mismo estado
- ✅ Cuando el estado es complejo (muchas variables)
- ✅ Cuando necesitas acciones específicas (atacar, comprar, etc.)
- ✅ Cuando quieres evitar prop drilling

### Nomenclatura del profesor:

- `outputState` en lugar de retornar directamente
- `if/else if` en lugar de `switch`
- Un solo `return` al final del reducer
- Variables descriptivas (no letras sueltas)
- `==` en lugar de `===`

---

¡Ahora ya sabes cómo funciona Context API + useReducer! 🎉
