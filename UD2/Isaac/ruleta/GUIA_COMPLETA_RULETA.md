# 🎰 Guía Completa: Ruleta con Context API (useState)

## 🎯 ¿Qué hace esta aplicación?

Es un juego de ruleta donde:
1. **Apuestas** dinero en una casilla (número, color, par/impar, etc.)
2. **Giras** la ruleta haciendo click en la palanca
3. **Ganas o pierdes** según donde caiga la bola
4. Tu **saldo** sube o baja según el resultado

---

## 📚 Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [El Archivo de Datos (casillas.json)](#el-archivo-de-datos)
3. [Context con useState](#context-con-usestate)
4. [Flujo Completo: De Click a Resultado](#flujo-completo)
5. [Análisis Componente por Componente](#análisis-componente-por-componente)
6. [Debugging Paso a Paso](#debugging-paso-a-paso)
7. [Diferencias con useReducer](#diferencias-con-usereducer)

---

## 1. Arquitectura General

### 🏗️ Estructura de Archivos

```
src/
├── casillas.json         ← Datos: números, colores, pagos
├── RuletaContext.jsx     ← Context con useState (almacén central)
├── App.jsx               ← Envuelve con Provider
├── Ruleta.jsx            ← Imagen ruleta + palanca
├── Tablero.jsx           ← Tablero de apuestas
├── Casilla.jsx           ← Cada casilla individual
└── Dineros.jsx           ← Saldo y apuesta
```

### 🔄 Flujo de Información

```
┌─────────────────────────────────────────────────────────┐
│                  RuletaContext.jsx                      │
│                 (Almacén Central)                       │
│                                                          │
│  Estados:                                               │
│  - numeroBola: número que salió                        │
│  - casillaApostada: dónde apostaste                    │
│  - importeApostado: cuánto apostaste                   │
│  - resultadoTirada: ganaste/perdiste                   │
│  - saldo: tu dinero actual                             │
│                                                          │
│  Funciones:                                             │
│  - comprobarResultado(): calcula ganancias             │
└─────────────────────────────────────────────────────────┘
              ↓ Provider envuelve ↓
┌─────────────────────────────────────────────────────────┐
│                      App.jsx                            │
│  ┌─────────────┐  ┌──────────────┐                    │
│  │  Ruleta     │  │   Dineros    │                     │
│  └─────────────┘  └──────────────┘                     │
│  ┌──────────────────────────────┐                      │
│  │         Tablero              │                      │
│  │  ┌────┐┌────┐┌────┐┌────┐  │                      │
│  │  │ 1  ││ 2  ││ 3  ││ 4  │  │                      │
│  │  └────┘└────┘└────┘└────┘  │                      │
│  └──────────────────────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

---

## 2. El Archivo de Datos (casillas.json)

### 📊 Estructura de los Datos

```javascript
{
  // ═══════════════════════════════════════════════════════
  // NÚMEROS INDIVIDUALES (0-36)
  // ═══════════════════════════════════════════════════════
  "0": {
    "numbers": [0],           // ← Array con el número que representa
    "clase": "green zero",    // ← Clase CSS para color verde
    "payout": 36              // ← Multiplicador: apuestas 5, ganas 5*36 = 180
  },

  "1": {
    "numbers": [1],
    "clase": "red",          // ← Rojo
    "payout": 36
  },

  "2": {
    "numbers": [2],
    "clase": "black",        // ← Negro
    "payout": 36
  },

  // ... números del 3 al 36 ...

  // ═══════════════════════════════════════════════════════
  // APUESTAS EXTERIORES - FILAS
  // ═══════════════════════════════════════════════════════
  "FILA 1": {
    "numbers": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    "clase": "bet-outside",
    "payout": 3              // ← Multiplicador x3
  },

  // ═══════════════════════════════════════════════════════
  // APUESTAS EXTERIORES - DOCENAS
  // ═══════════════════════════════════════════════════════
  "1 - 12": {
    "numbers": [1,2,3,4,5,6,7,8,9,10,11,12],
    "clase": "bet-outside",
    "payout": 3
  },

  // ═══════════════════════════════════════════════════════
  // APUESTAS EXTERIORES - PAR/IMPAR, ROJO/NEGRO
  // ═══════════════════════════════════════════════════════
  "PAR": {
    "numbers": [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36],
    "clase": "bet-outside",
    "payout": 2              // ← Multiplicador x2
  },

  "ROJO": {
    "numbers": [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],
    "clase": "red",
    "payout": 2
  }
}
```

### 🔍 ¿Cómo se usan los datos?

Ejemplo: Apuestas 10€ al número "7"

```javascript
// Buscamos en casillas.json:
casillas["7"] = {
  numbers: [7],
  clase: "red",
  payout: 36
}

// Si sale el 7:
// Ganas = apuesta * payout = 10 * 36 = 360€
// Saldo = saldo_anterior - apuesta + ganancias
//       = 100 - 10 + 360 = 450€

// Si sale otro número:
// Pierdes = apuesta
// Saldo = saldo_anterior - apuesta
//       = 100 - 10 = 90€
```

---

## 3. Context con useState

### 🆚 Diferencia Principal: useState vs useReducer

```javascript
// ═══════════════════════════════════════════════════════
// ESTE PROYECTO (Ruleta) - Usa useState
// ═══════════════════════════════════════════════════════
const [numeroBola, setNumeroBola] = useState(0);
const [saldo, setSaldo] = useState(100);

// Modificas directamente con set:
setNumeroBola(23);
setSaldo(150);

// ═══════════════════════════════════════════════════════
// PROYECTO Tower Defense - Usa useReducer
// ═══════════════════════════════════════════════════════
const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

// Modificas con acciones:
dispatch({ type: 'CAMBIAR_NUMERO', numero: 23 });
dispatch({ type: 'CAMBIAR_SALDO', saldo: 150 });
```

### 📁 RuletaContext.jsx (Análisis Completo)

```javascript
import React, { createContext, useEffect, useState } from 'react';
import casillas from "./casillas.json";

// ════════════════════════════════════════════════════════
// PASO 1: Crear el contexto
// ════════════════════════════════════════════════════════
export const RuletaContext = createContext();
// Esto crea el "almacén vacío"

// ════════════════════════════════════════════════════════
// PASO 2: Crear el Provider
// ════════════════════════════════════════════════════════
export function RuletaProvider({ children }) {

    // ──────────────────────────────────────────────────────
    // ESTADOS con useState (NO useReducer)
    // ──────────────────────────────────────────────────────

    // Estado 1: Número que salió en la ruleta
    const [numeroBola, setNumeroBola] = useState(0);
    // Inicialmente 0, cambia cuando giras la ruleta

    // Estado 2: Casilla donde apostaste
    const [casillaApostada, setCasillaApostada] = useState("");
    // "" = no has apostado aún
    // "7" = apostaste al número 7
    // "ROJO" = apostaste a rojo

    // Estado 3: Cuánto dinero apostaste
    const [importeApostado, setImporteApostado] = useState(5);
    // Por defecto 5€

    // Estado 4: Resultado de la tirada
    const [resultadoTirada, setResultadoTirada] = useState("");
    // "" = no has jugado
    // "¡Has ganado!" = ganaste
    // "Has perdido" = perdiste

    // Estado 5: Tu saldo actual
    const [saldo, setSaldo] = useState(100);
    // Empiezas con 100€

    // ──────────────────────────────────────────────────────
    // USEEFFECT - Se ejecuta cuando cambia numeroBola
    // ──────────────────────────────────────────────────────
    useEffect(() => {
        comprobarResultado();
    }, [numeroBola]);
    // Cada vez que sale un nuevo número, comprobamos si ganaste

    // ──────────────────────────────────────────────────────
    // FUNCIÓN: comprobarResultado
    // ──────────────────────────────────────────────────────
    function comprobarResultado() {

        // Variable temporal para el nuevo saldo
        let nuevoSaldo = saldo;

        // ┌────────────────────────────────────────────────┐
        // │ CASO 1: No has apostado                       │
        // └────────────────────────────────────────────────┘
        if(casillaApostada == "") {
            setResultadoTirada("");
            // No muestras nada
        }

        // ┌────────────────────────────────────────────────┐
        // │ CASO 2: Has apostado y GANASTE                │
        // └────────────────────────────────────────────────┘
        else if (casillas[casillaApostada].numbers.includes(numeroBola)) {
            // .includes() comprueba si numeroBola está en el array

            // Ejemplo:
            // casillaApostada = "ROJO"
            // casillas["ROJO"].numbers = [1,3,5,7,9,...]
            // numeroBola = 7
            // [1,3,5,7,9,...].includes(7) = true ✅ GANASTE

            setResultadoTirada("¡Has ganado!");

            // Calcular nuevo saldo:
            // 1. Restas lo apostado: saldo - importeApostado
            // 2. Sumas las ganancias: importeApostado * payout
            nuevoSaldo = (saldo - importeApostado + importeApostado * casillas[casillaApostada].payout);

            // Ejemplo:
            // saldo = 100
            // importeApostado = 10
            // payout = 2 (ROJO)
            // nuevoSaldo = 100 - 10 + 10*2 = 100 - 10 + 20 = 110
        }

        // ┌────────────────────────────────────────────────┐
        // │ CASO 3: Has apostado y PERDISTE               │
        // └────────────────────────────────────────────────┘
        else {
            setResultadoTirada("Has perdido");

            // Solo restas lo apostado
            nuevoSaldo = (saldo - importeApostado);
        }

        // ┌────────────────────────────────────────────────┐
        // │ AJUSTE: Si no tienes suficiente dinero        │
        // └────────────────────────────────────────────────┘
        if(nuevoSaldo < importeApostado){
            // Si te quedan 3€ pero la apuesta es de 5€,
            // reducimos la apuesta a 3€
            setImporteApostado(nuevoSaldo);
        }

        // ┌────────────────────────────────────────────────┐
        // │ ACTUALIZAR SALDO                               │
        // └────────────────────────────────────────────────┘
        setSaldo(nuevoSaldo)
    }

    // ──────────────────────────────────────────────────────
    // RETURN: Provider con todos los valores
    // ──────────────────────────────────────────────────────
    return (
        <RuletaContext.Provider value={{
            // Compartimos los datos del JSON
            casillas,

            // Compartimos los estados
            numeroBola,
            casillaApostada,
            importeApostado,
            resultadoTirada,
            saldo,

            // Compartimos las funciones para modificar
            setNumeroBola,
            setCasillaApostada,
            setResultadoTirada,
            setImporteApostado,
            setSaldo
        }}>
            {children}
        </RuletaContext.Provider>
    );
}
```

---

## 4. Flujo Completo: De Click a Resultado

### 🎬 Escenario: Apuestas 10€ al ROJO y giras

```
👤 USUARIO
│
├─ PASO 1: Click en casilla "ROJO"
│  └─ Componente: Casilla.jsx
│     └─ Ejecuta: setCasillaApostada("ROJO")
│        └─ RuletaContext actualiza: casillaApostada = "ROJO"
│
├─ PASO 2: Click en + para subir apuesta a 10
│  └─ Componente: Dineros.jsx
│     └─ Ejecuta: setImporteApostado(10)
│        └─ RuletaContext actualiza: importeApostado = 10
│
├─ PASO 3: Click en palanca (girar ruleta)
│  └─ Componente: Ruleta.jsx
│     └─ Función: tiradaRuleta()
│        │
│        ├─ 3.1: setGirando("girando")
│        │       └─ La ruleta empieza a girar (CSS animation)
│        │
│        ├─ 3.2: Espera 3 segundos (setTimeout)
│        │       console.log("Girando...")
│        │
│        └─ 3.3: Genera número aleatorio
│                numeroGenerado = 23 (Negro)
│                setNumeroBola(23)
│                setGirando("")
│
├─ PASO 4: useEffect detecta cambio de numeroBola
│  └─ RuletaContext.jsx
│     └─ useEffect ejecuta: comprobarResultado()
│        │
│        ├─ 4.1: Comprobar si ganó
│        │       casillaApostada = "ROJO"
│        │       casillas["ROJO"].numbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
│        │       numeroBola = 23
│        │       [1,3,5,7,9,...].includes(23) = true ✅
│        │
│        ├─ 4.2: ¡GANASTE!
│        │       setResultadoTirada("¡Has ganado!")
│        │
│        ├─ 4.3: Calcular ganancias
│        │       saldo = 100
│        │       importeApostado = 10
│        │       payout = 2
│        │       nuevoSaldo = 100 - 10 + 10*2 = 110
│        │
│        └─ 4.4: Actualizar saldo
│                setSaldo(110)
│
└─ PASO 5: UI se actualiza
   └─ Dineros.jsx muestra: Saldo = 110
   └─ Tablero.jsx muestra: "ROJO - ¡Has ganado!"
```

---

## 5. Análisis Componente por Componente

### 📁 App.jsx

```javascript
import { RuletaProvider } from './RuletaContext';
import Ruleta from './Ruleta';
import Tablero from './Tablero';
import Dineros from './Dineros';

function App() {
  return (
    <>
      {/* ════════════════════════════════════════════ */}
      {/* ENVOLVEMOS TODO con RuletaProvider          */}
      {/* ════════════════════════════════════════════ */}
      <RuletaProvider>
        <div class="container text-center">
          <div class="row">
            {/* Componente con la ruleta y palanca */}
            <Ruleta />

            {/* Componente con saldo y apuesta */}
            <Dineros />
          </div>

          {/* Componente con el tablero de apuestas */}
          <Tablero />
        </div>
      </RuletaProvider>
    </>
  )
}
```

**Explicación:**
- `RuletaProvider` envuelve TODA la aplicación
- Así `Ruleta`, `Dineros` y `Tablero` pueden acceder al contexto
- No hace falta pasar props manualmente

---

### 📁 Ruleta.jsx (Girar la Ruleta)

```javascript
import ruleta from "./assets/ruleta.png"
import palanca from "./assets/palanca.png"
import { useContext, useState } from 'react';
import { RuletaContext } from './RuletaContext';

// ════════════════════════════════════════════════════════
// FUNCIÓN AUXILIAR: Generar número aleatorio
// ════════════════════════════════════════════════════════
function getRandomInt(min, max) {
    min = Math.ceil(min);    // Redondea hacia arriba
    max = Math.floor(max);   // Redondea hacia abajo
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Ejemplo: getRandomInt(0, 36)
// Math.random() = 0.764 (número entre 0 y 1)
// 0.764 * (36 - 0 + 1) = 0.764 * 37 = 28.268
// Math.floor(28.268 + 0) = 28

export default function Ruleta() {

    // ──────────────────────────────────────────────────────
    // ACCEDER AL CONTEXTO
    // ──────────────────────────────────────────────────────
    const { numeroBola, setNumeroBola, saldo } = useContext(RuletaContext);
    // numeroBola: para mostrarlo
    // setNumeroBola: para cambiarlo cuando sale un número
    // saldo: para comprobar si puedes jugar

    // ──────────────────────────────────────────────────────
    // ESTADO LOCAL: girando (solo para animación)
    // ──────────────────────────────────────────────────────
    const [girando, setGirando] = useState("");
    // "" = no está girando
    // "girando" = está girando (se añade como clase CSS)

    // ──────────────────────────────────────────────────────
    // FUNCIÓN: tiradaRuleta
    // ──────────────────────────────────────────────────────
    function tiradaRuleta() {

        // Solo permite girar si:
        // 1. No está girando ya (girando != "girando")
        // 2. Tienes saldo (saldo > 0)
        if (girando != "girando" && saldo > 0) {

            // ┌────────────────────────────────────────────┐
            // │ PASO 1: Empezar animación                  │
            // └────────────────────────────────────────────┘
            setGirando("girando");
            console.log("🎡 La ruleta empieza a girar...");

            // ┌────────────────────────────────────────────┐
            // │ PASO 2: Esperar 3 segundos                 │
            // └────────────────────────────────────────────┘
            setTimeout(() => {
                // Esta función se ejecuta después de 3000ms = 3 segundos

                // ┌────────────────────────────────────────┐
                // │ PASO 3: Generar número aleatorio       │
                // └────────────────────────────────────────┘
                let numeroGenerado = getRandomInt(0, 36);
                console.log("🎯 Número generado:", numeroGenerado);

                // ┌────────────────────────────────────────┐
                // │ PASO 4: Actualizar número en contexto  │
                // └────────────────────────────────────────┘
                setNumeroBola(numeroGenerado);
                // Esto dispara el useEffect en RuletaContext

                // ┌────────────────────────────────────────┐
                // │ PASO 5: Detener animación              │
                // └────────────────────────────────────────┘
                setGirando("");
                console.log("🛑 La ruleta se detiene");

            }, 3000);
        }
    }

    return (
        <>
            {/* Imagen de la ruleta */}
            <div class="col-5">
                <img
                    className={`img-fluid ${girando}`}
                    src={ruleta}
                />
                {/* Si girando="girando", la clase será: "img-fluid girando" */}
                {/* El CSS hace que gire con @keyframes */}
            </div>

            {/* Palanca para girar */}
            <div class="col-3">
                <img
                    class="img-fluid"
                    src={palanca}
                    onClick={tiradaRuleta}
                />
            </div>

            {/* Mostrar número que salió */}
            <div class="col-3">
                <p className="resultado">{numeroBola}</p>
            </div>
        </>
    )
}
```

---

### 📁 Tablero.jsx (Mostrar Casillas)

```javascript
import Casilla from "./Casilla";
import { useContext } from 'react';
import { RuletaContext } from './RuletaContext';

export default function Tablero() {

    // ──────────────────────────────────────────────────────
    // ACCEDER AL CONTEXTO
    // ──────────────────────────────────────────────────────
    const { casillaApostada, casillas, resultadoTirada } = useContext(RuletaContext);

    // ──────────────────────────────────────────────────────
    // PREPARAR NÚMEROS PARA EL GRID
    // ──────────────────────────────────────────────────────
    const fila1 = casillas["FILA 1"].numbers
    // [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]

    const fila2 = casillas["FILA 2"].numbers
    // [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]

    const fila3 = casillas["FILA 3"].numbers
    // [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]

    // Unimos todas las filas en un solo array
    const claves = [...fila1, ...fila2, ...fila3];
    // [3, 6, 9, ..., 2, 5, 8, ..., 1, 4, 7, ...]

    return (
        <div class="roulette-wrapper">
            {/* ════════════════════════════════════════════ */}
            {/* MOSTRAR RESULTADO                            */}
            {/* ════════════════════════════════════════════ */}
            <h1>{casillaApostada} - {resultadoTirada}</h1>
            {/* Ejemplo: "ROJO - ¡Has ganado!" */}

            <div class="roulette-board d-grid">

                {/* ════════════════════════════════════════ */}
                {/* CASILLA DEL 0                            */}
                {/* ════════════════════════════════════════ */}
                <Casilla valor={"0"} />

                {/* ════════════════════════════════════════ */}
                {/* NÚMEROS DEL 1 AL 36                      */}
                {/* ════════════════════════════════════════ */}
                <div class="numbers-grid d-grid">
                    {claves.map((clave) =>
                        (<Casilla key={clave} valor={clave} />)
                    )}
                    {/* Genera 36 componentes Casilla */}
                </div>

                {/* ════════════════════════════════════════ */}
                {/* APUESTAS EXTERIORES - FILAS              */}
                {/* ════════════════════════════════════════ */}
                <div class="column-bets d-grid">
                    <Casilla valor={"FILA 1"} />
                    <Casilla valor={"FILA 2"} />
                    <Casilla valor={"FILA 3"} />
                </div>

                {/* ════════════════════════════════════════ */}
                {/* APUESTAS EXTERIORES - DOCENAS            */}
                {/* ════════════════════════════════════════ */}
                <div class="docenas-grid d-grid">
                    <div class="cell empty"></div>
                    <Casilla valor={"1 - 12"} />
                    <Casilla valor={"13 - 24"} />
                    <Casilla valor={"25 - 36"} />
                    <div class="cell empty"></div>
                </div>

                {/* ════════════════════════════════════════ */}
                {/* APUESTAS EXTERIORES - PAR/IMPAR/COLOR    */}
                {/* ════════════════════════════════════════ */}
                <div class="outside-bets d-grid">
                    <div class="cell empty"></div>
                    <Casilla valor={"1 - 18"} />
                    <Casilla valor={"PAR"} />
                    <Casilla valor={"ROJO"} />
                    <Casilla valor={"NEGRO"} />
                    <Casilla valor={"IMPAR"} />
                    <Casilla valor={"19 - 36"} />
                    <div class="cell empty"></div>
                </div>

            </div>
        </div>
    )
}
```

---

### 📁 Casilla.jsx (Cada Casilla)

```javascript
import { useContext } from 'react';
import { RuletaContext } from './RuletaContext';

export default function Casilla({ valor }) {
    // valor = "7", "ROJO", "PAR", etc.

    // ──────────────────────────────────────────────────────
    // ACCEDER AL CONTEXTO
    // ──────────────────────────────────────────────────────
    const { casillas, setCasillaApostada } = useContext(RuletaContext);

    // ──────────────────────────────────────────────────────
    // OBTENER CLASE CSS
    // ──────────────────────────────────────────────────────
    let clase = casillas[valor].clase
    // Ejemplo:
    // valor = "7"
    // casillas["7"].clase = "red"
    // clase = "red"

    return (
        <div
            className={`cell ${clase}`}
            onClick={() => setCasillaApostada(valor)}
        >
            {valor}
        </div>
    )
}

// ════════════════════════════════════════════════════════
// EJEMPLO DE CLICK:
// ════════════════════════════════════════════════════════
// Usuario hace click en casilla "ROJO"
// 1. onClick ejecuta: setCasillaApostada("ROJO")
// 2. RuletaContext actualiza: casillaApostada = "ROJO"
// 3. Tablero.jsx muestra: "ROJO - " (sin resultado aún)
```

---

### 📁 Dineros.jsx (Saldo y Apuesta)

```javascript
import { useContext } from 'react';
import { RuletaContext } from './RuletaContext';

export default function Dineros() {

    // ──────────────────────────────────────────────────────
    // CONSTANTE: Incremento de apuesta
    // ──────────────────────────────────────────────────────
    const STEP_APUESTA = 5;
    // Cada vez que haces +/-, cambia de 5 en 5

    // ──────────────────────────────────────────────────────
    // ACCEDER AL CONTEXTO
    // ──────────────────────────────────────────────────────
    const { saldo, importeApostado, setImporteApostado } = useContext(RuletaContext);

    // ──────────────────────────────────────────────────────
    // FUNCIÓN: cambiarApuesta
    // ──────────────────────────────────────────────────────
    function cambiarApuesta(cantidad) {
        // cantidad = +5 o -5

        // ┌────────────────────────────────────────────────┐
        // │ PASO 1: Calcular nueva apuesta                 │
        // └────────────────────────────────────────────────┘
        let apuestaNueva = importeApostado + cantidad;

        // Ejemplo 1 (subir):
        // importeApostado = 10
        // cantidad = +5
        // apuestaNueva = 15

        // Ejemplo 2 (bajar):
        // importeApostado = 10
        // cantidad = -5
        // apuestaNueva = 5

        // ┌────────────────────────────────────────────────┐
        // │ PASO 2: Validar que no supere el saldo         │
        // └────────────────────────────────────────────────┘
        if (apuestaNueva <= saldo) {

            // ┌────────────────────────────────────────────┐
            // │ PASO 3: Validar mínimo (5€)                │
            // └────────────────────────────────────────────┘
            if (apuestaNueva < STEP_APUESTA) {
                apuestaNueva = STEP_APUESTA
            }
            // Si intentas bajar de 5€, se queda en 5€

            // ┌────────────────────────────────────────────┐
            // │ PASO 4: Actualizar apuesta                 │
            // └────────────────────────────────────────────┘
            setImporteApostado(apuestaNueva)
        }
        // Si apuestaNueva > saldo, no hace nada
    }

    return (
        <div className='dineros'>
            {/* ════════════════════════════════════════════ */}
            {/* SALDO ACTUAL                                 */}
            {/* ════════════════════════════════════════════ */}
            <div>{saldo}</div>

            {/* ════════════════════════════════════════════ */}
            {/* BOTÓN BAJAR APUESTA                          */}
            {/* ════════════════════════════════════════════ */}
            <span onClick={() => cambiarApuesta(-STEP_APUESTA)}>➖</span>

            {/* ════════════════════════════════════════════ */}
            {/* APUESTA ACTUAL                               */}
            {/* ════════════════════════════════════════════ */}
            <span>{importeApostado}</span>

            {/* ════════════════════════════════════════════ */}
            {/* BOTÓN SUBIR APUESTA                          */}
            {/* ════════════════════════════════════════════ */}
            <span onClick={() => cambiarApuesta(STEP_APUESTA)}>➕</span>
        </div>
    )
}
```

---

## 6. Debugging Paso a Paso

### 🔍 Seguimiento Completo: Click en "ROJO" y Girar

```javascript
// ════════════════════════════════════════════════════════
// ESTADO INICIAL
// ════════════════════════════════════════════════════════
console.log('═══ ESTADO INICIAL ═══');
console.log('saldo:', 100);
console.log('importeApostado:', 5);
console.log('casillaApostada:', '');
console.log('numeroBola:', 0);
console.log('resultadoTirada:', '');

// ════════════════════════════════════════════════════════
// PASO 1: Usuario hace click en "ROJO"
// ════════════════════════════════════════════════════════
console.log('\n🖱️ PASO 1: Click en casilla ROJO');
console.log('Componente: Casilla.jsx');
console.log('Ejecuta: setCasillaApostada("ROJO")');

// Casilla.jsx línea 13
onClick={() => setCasillaApostada("ROJO")}

console.log('✅ Estado actualizado:');
console.log('casillaApostada:', 'ROJO');

// ════════════════════════════════════════════════════════
// PASO 2: Usuario hace click en + para subir a 10
// ════════════════════════════════════════════════════════
console.log('\n➕ PASO 2: Click en + (subir apuesta)');
console.log('Componente: Dineros.jsx');
console.log('Ejecuta: cambiarApuesta(5)');

// Dineros.jsx función cambiarApuesta
console.log('  apuestaNueva = 5 + 5 = 10');
console.log('  10 <= 100 (saldo) ✅');
console.log('  10 >= 5 (mínimo) ✅');
console.log('  setImporteApostado(10)');

console.log('✅ Estado actualizado:');
console.log('importeApostado:', 10);

// ════════════════════════════════════════════════════════
// PASO 3: Usuario hace click en palanca
// ════════════════════════════════════════════════════════
console.log('\n🎡 PASO 3: Click en palanca');
console.log('Componente: Ruleta.jsx');
console.log('Ejecuta: tiradaRuleta()');

// Ruleta.jsx función tiradaRuleta
console.log('  Validación:');
console.log('    girando != "girando" ✅');
console.log('    saldo > 0 ✅');

console.log('  setGirando("girando")');
console.log('  ⏱️ Esperando 3 segundos...');

// Después de 3 segundos...
console.log('\n  🎲 Generando número aleatorio...');
console.log('  getRandomInt(0, 36)');
console.log('  Math.random() = 0.639');
console.log('  0.639 * 37 = 23.64');
console.log('  Math.floor(23.64) = 23');
console.log('  numeroGenerado = 23');

console.log('  setNumeroBola(23)');
console.log('  setGirando("")');

console.log('✅ Estado actualizado:');
console.log('numeroBola:', 23);
console.log('girando:', '');

// ════════════════════════════════════════════════════════
// PASO 4: useEffect detecta cambio de numeroBola
// ════════════════════════════════════════════════════════
console.log('\n⚡ PASO 4: useEffect dispara comprobarResultado()');
console.log('Archivo: RuletaContext.jsx línea 15-17');

// RuletaContext.jsx useEffect
useEffect(() => {
    comprobarResultado();
}, [numeroBola]);

console.log('  numeroBola cambió de 0 → 23');
console.log('  Ejecutando comprobarResultado()...');

// ════════════════════════════════════════════════════════
// PASO 5: Ejecutar comprobarResultado()
// ════════════════════════════════════════════════════════
console.log('\n🔍 PASO 5: comprobarResultado()');

console.log('  Estado actual:');
console.log('    casillaApostada: "ROJO"');
console.log('    numeroBola: 23');
console.log('    importeApostado: 10');
console.log('    saldo: 100');

console.log('\n  Comprobando...');
console.log('    casillaApostada == "" ? NO');

console.log('\n  Buscando en casillas.json:');
console.log('    casillas["ROJO"].numbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]');

console.log('\n  ¿Está 23 en el array?');
console.log('    [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(23)');
console.log('    = true ✅ ¡GANASTE!');

console.log('\n  Calculando ganancias:');
console.log('    payout = casillas["ROJO"].payout = 2');
console.log('    nuevoSaldo = saldo - importeApostado + importeApostado * payout');
console.log('    nuevoSaldo = 100 - 10 + 10 * 2');
console.log('    nuevoSaldo = 100 - 10 + 20');
console.log('    nuevoSaldo = 110');

console.log('\n  setResultadoTirada("¡Has ganado!")');
console.log('  setSaldo(110)');

console.log('\n✅ Estado final:');
console.log('saldo:', 110);
console.log('resultadoTirada:', '¡Has ganado!');

// ════════════════════════════════════════════════════════
// PASO 6: React re-renderiza componentes
// ════════════════════════════════════════════════════════
console.log('\n🔄 PASO 6: React actualiza UI');
console.log('  Dineros.jsx: muestra saldo = 110');
console.log('  Tablero.jsx: muestra "ROJO - ¡Has ganado!"');
```

---

## 7. Diferencias con useReducer

### 🆚 Comparación: useState vs useReducer

#### Con useState (Este Proyecto - Ruleta)

```javascript
// ════════════════════════════════════════════════════════
// MÚLTIPLES ESTADOS SEPARADOS
// ════════════════════════════════════════════════════════
const [numeroBola, setNumeroBola] = useState(0);
const [casillaApostada, setCasillaApostada] = useState("");
const [saldo, setSaldo] = useState(100);

// ════════════════════════════════════════════════════════
// MODIFICAR: Llamar directamente a set
// ════════════════════════════════════════════════════════
setNumeroBola(23);
setCasillaApostada("ROJO");
setSaldo(110);

// ════════════════════════════════════════════════════════
// LÓGICA: En funciones normales
// ════════════════════════════════════════════════════════
function comprobarResultado() {
  if (casillas[casillaApostada].numbers.includes(numeroBola)) {
    setSaldo(saldo + importeApostado * 2);
  }
}
```

#### Con useReducer (Tower Defense)

```javascript
// ════════════════════════════════════════════════════════
// UN SOLO ESTADO CENTRALIZADO
// ════════════════════════════════════════════════════════
const INITIAL_STATE = {
  numeroBola: 0,
  casillaApostada: "",
  saldo: 100
}

const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

// ════════════════════════════════════════════════════════
// MODIFICAR: Enviar acciones
// ════════════════════════════════════════════════════════
dispatch({ type: 'SET_NUMERO', numero: 23 });
dispatch({ type: 'SET_CASILLA', casilla: "ROJO" });
dispatch({ type: 'GANAR_APUESTA' });

// ════════════════════════════════════════════════════════
// LÓGICA: En el reducer
// ════════════════════════════════════════════════════════
function gameReducer(state, action) {
  let outputState = state;

  if (action.type == 'GANAR_APUESTA') {
    outputState = {
      ...state,
      saldo: state.saldo + state.importeApostado * 2
    }
  }

  return outputState;
}
```

### 📊 Cuándo usar cada uno

| Aspecto | useState | useReducer |
|---------|----------|------------|
| **Complejidad** | Estados simples e independientes | Estados complejos relacionados |
| **Cantidad de estados** | Pocos (2-5) | Muchos (5+) |
| **Lógica** | Funciones simples | Lógica compleja con muchas reglas |
| **Modificaciones** | Directas con set | A través de acciones |
| **Debugging** | Más difícil | Más fácil (todas las acciones centralizadas) |

**Este proyecto usa useState porque:**
- Los estados son relativamente independientes
- La lógica es simple (comprobar si ganaste)
- No hay muchas "acciones" complejas

**Tower Defense usa useReducer porque:**
- Muchos estados relacionados (vida, daño, puntos, oleada...)
- Lógica compleja (enemigos, mejoras, combate...)
- Muchas acciones (atacar, comprar, nueva oleada...)

---

## 🎓 Resumen Final

### Context API con useState en 5 pasos:

1. **Crear contexto**: `export const RuletaContext = createContext()`
2. **Crear Provider con useState**:
   ```javascript
   const [saldo, setSaldo] = useState(100)
   ```
3. **Compartir en value**:
   ```javascript
   value={{ saldo, setSaldo }}
   ```
4. **Envolver App**:
   ```javascript
   <RuletaProvider><App /></RuletaProvider>
   ```
5. **Usar en componentes**:
   ```javascript
   const { saldo, setSaldo } = useContext(RuletaContext)
   ```

### Flujo del juego:

1. **Apostar** → Click en casilla → `setCasillaApostada()`
2. **Ajustar apuesta** → +/- → `setImporteApostado()`
3. **Girar** → Click palanca → Genera número → `setNumeroBola()`
4. **Comprobar** → useEffect → `comprobarResultado()`
5. **Actualizar** → `setSaldo()` y `setResultadoTirada()`

### Conceptos clave:

- ✅ **includes()**: Comprueba si un número está en un array
- ✅ **setTimeout()**: Espera 3 segundos antes de generar número
- ✅ **useEffect()**: Detecta cambios en `numeroBola` y comprueba resultado
- ✅ **Spread operator** (`...`): Une arrays de números
- ✅ **Template strings**: `` `cell ${clase}` ``

---

¡Ahora entiendes completamente cómo funciona la Ruleta! 🎰🎉
