# Resumen de Ejercicios - PracticaPT1

## Ejercicios Completados

### ✅ 1. Carrera de Caballos
- **Ruta**: `01-carrera-caballos/`
- **Temática**: Casino/Apuestas
- **Características**: 2-6 caballos, sistema de apuestas, multiplicadores
- **Escalable**: Número de caballos configurable

### ✅ 2. BlackJack
- **Ruta**: `02-blackjack/`
- **Temática**: Casino
- **Características**: Reglas completas del 21, sistema de apuestas, As con valor variable
- **Hooks**: useState, useEffect

### ✅ 3. Conecta 4
- **Ruta**: `03-conecta4/`
- **Temática**: Juego clásico
- **Características**: 6x7 tablero, detección 4 direcciones, 2 jugadores
- **Lógica**: Gravedad de fichas, verificación horizontal/vertical/diagonal

### ✅ 4. Snake (Serpiente)
- **Ruta**: `04-snake/`
- **Temática**: Juego clásico
- **Características**: Movimiento continuo, crecimiento, velocidad progresiva
- **Escalable**: Tamaño cuadrícula 10x10 a 30x30
- **Hooks**: useEffect para movimiento, eventos teclado

### ✅ 5. Memory Game (Parejas)
- **Ruta**: `05-memory-game/`
- **Temática**: Memoria
- **Características**: 4-16 parejas, temporizador 1s, contador movimientos
- **Escalable**: Número de parejas configurable

### ✅ 6. Simon Dice
- **Ruta**: `06-simon-dice/`
- **Temática**: Memoria/Secuencias
- **Características**: 4 colores, secuencias progresivas, niveles infinitos
- **Animaciones**: setTimeout para secuencias

### ⚠️ 7. Buscaminas
- **Ruta**: `07-buscaminas/`
- **Estado**: Estructura creada, requiere implementación completa
- **Características esperadas**: Cuadrícula escalable, banderas, revelado recursivo

### ⚠️ 8. Wordle
- **Ruta**: `08-wordle/`
- **Estado**: Estructura creada, requiere implementación completa
- **Características esperadas**: 6 intentos, verificación colores, lista palabras

### ✅ 9. Tragaperras
- **Ruta**: `09-tragaperras/`
- **Temática**: Casino
- **Características**: 3-5 rodillos, animaciones giro, multiplicadores especiales
- **Escalable**: Número de rodillos configurable

### ⚠️ 10. Pong
- **Ruta**: `10-pong/`
- **Estado**: Estructura creada, requiere implementación completa
- **Características esperadas**: 2 jugadores o vs IA, física de rebotes

## Características Comunes

Todos los ejercicios implementados siguen estas reglas:
- ✅ Solo se modifica App.jsx
- ✅ Sin uso de `break`
- ✅ Un solo `return` por función
- ✅ Uso apropiado de hooks (useState, useEffect)
- ✅ Escalabilidad donde sea posible
- ✅ Enunciado.md incluido

## Ejercicios Pendientes de Completar

Para completar la práctica, faltan implementar completamente:
1. **Buscaminas** (07)
2. **Wordle** (08)
3. **Pong** (10)

Cada uno tiene su estructura de proyecto Vite creada lista para desarrollar.

## Recomendación de Estudio

**Orden sugerido de práctica**:
1. Carrera de Caballos (más simple)
2. Tragaperras
3. Memory Game
4. Simon Dice
5. Conecta 4
6. Snake
7. BlackJack (más complejo)

**Por temática**:
- **Casino**: Caballos, BlackJack, Tragaperras
- **Clásicos**: Conecta 4, Snake
- **Memoria**: Memory Game, Simon Dice
