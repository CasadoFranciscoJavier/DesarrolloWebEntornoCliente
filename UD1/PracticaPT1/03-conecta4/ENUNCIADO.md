# Ejercicio 3: Conecta 4

## Objetivo
Crear un juego de Conecta 4 funcional para dos jugadores utilizando React y hooks.

## Requisitos funcionales

### Configuración del tablero
- El tablero debe tener 6 filas y 7 columnas
- Debe haber dos jugadores: Rojo (jugador 1) y Amarillo (jugador 2)
- El tablero debe estar vacío al inicio del juego

### Mecánica del juego
- Los jugadores alternan turnos
- Al hacer clic en una columna, la ficha cae a la posición más baja disponible
- No se puede colocar una ficha en una columna llena
- El juego debe detectar automáticamente cuatro fichas consecutivas del mismo color

### Condiciones de victoria
El juego debe verificar si hay 4 fichas consecutivas en:
- Horizontal (en cualquier fila)
- Vertical (en cualquier columna)
- Diagonal ascendente (de abajo-izquierda a arriba-derecha)
- Diagonal descendente (de arriba-izquierda a abajo-derecha)

### Condiciones de fin de juego
- Cuando un jugador consigue 4 en línea, se declara ganador
- Si el tablero se llena sin ganador, se declara empate
- El juego debe bloquearse una vez haya un ganador o empate

### Interfaz visual
- Mostrar claramente de quién es el turno actual
- Las fichas deben tener colores distintivos (rojo y amarillo)
- Mostrar claramente quién ganó al finalizar
- Indicar si hay empate

### Controles del juego
- Hacer clic en cualquier celda de una columna para soltar la ficha
- Botón para reiniciar partida después de terminar

## Restricciones técnicas
- Solo modificar el archivo App.jsx
- No usar `break` en ninguna parte del código
- Cada función debe tener un único `return`
- Usar `useState` apropiadamente
- La ficha debe caer a la posición más baja disponible en la columna

## Criterios de evaluación
- Correcta implementación de la lógica del Conecta 4
- Detección precisa de las 4 direcciones posibles de victoria
- Interfaz clara e intuitiva
- Código limpio sin `break` y con un solo `return` por función
- Correcto manejo del turno de jugadores
