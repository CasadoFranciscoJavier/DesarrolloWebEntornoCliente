# Ejercicio 5: Memory Game (Juego de Parejas)

## Objetivo
Crear un juego de memoria donde el jugador debe encontrar todas las parejas de cartas utilizando React y hooks.

## Requisitos funcionales

### Configuración del juego
- El jugador puede elegir el número de parejas antes de iniciar (entre 4 y 16 parejas)
- Las cartas se deben distribuir en una cuadrícula de 4 columnas
- Cada pareja debe tener emojis idénticos
- Las cartas deben mezclarse aleatoriamente al inicio

### Mecánica del juego
- Todas las cartas comienzan boca abajo
- El jugador puede voltear hasta 2 cartas por turno
- Si las 2 cartas volteadas coinciden, permanecen visibles
- Si no coinciden, se vuelven a voltear después de 1 segundo
- El jugador puede seguir volteando parejas
- No se puede voltear más de 2 cartas a la vez

### Sistema de puntuación
- Contar el número de movimientos (cada par de cartas volteadas cuenta como 1 movimiento)
- Mostrar los movimientos en tiempo real
- Mostrar los movimientos totales al ganar

### Condición de victoria
- El juego se gana cuando se encuentran todas las parejas
- Mostrar mensaje de victoria con el número de movimientos

### Interfaz visual
- Cartas claramente diferenciadas cuando están boca abajo
- Animación visual cuando se encuentra una pareja
- Diferentes emojis para cada pareja
- Las cartas encontradas deben tener un aspecto diferente

### Controles del juego
- Click en las cartas para voltearlas
- Input numérico para elegir número de parejas
- Botón para iniciar juego
- Botón para jugar de nuevo después de ganar

## Restricciones técnicas
- Solo modificar el archivo App.jsx
- No usar `break` en ninguna parte del código
- Cada función debe tener un único `return`
- Usar `useState` y `useEffect` apropiadamente
- El juego debe ser escalable (número de parejas configurable)
- Máximo 2 cartas volteadas simultáneamente

## Criterios de evaluación
- Correcta lógica de comparación de parejas
- Temporizador de 1 segundo antes de voltear cartas no coincidentes
- Interfaz clara e intuitiva
- Código limpio sin `break` y con un solo `return` por función
- Escalabilidad del número de parejas
- Correcto control del límite de 2 cartas por turno
