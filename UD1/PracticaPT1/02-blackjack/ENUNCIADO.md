# Ejercicio 2: BlackJack (21)

## Objetivo
Crear un juego de BlackJack funcional con sistema de apuestas utilizando React y hooks.

## Requisitos funcionales

### Configuración del juego
- El jugador inicia con un saldo de $100
- El jugador puede configurar el monto de su apuesta antes de cada partida
- La baraja debe contener 52 cartas (4 palos: ♣, ♦, ♥, ♠)
- Las cartas deben mezclarse aleatoriamente al inicio de cada partida

### Reglas del BlackJack
- Al inicio se reparten 2 cartas al jugador y 2 al crupier
- Una carta del crupier permanece oculta hasta que termine el turno del jugador
- El objetivo es llegar a 21 puntos sin pasarse
- Los valores de las cartas son:
  - Números del 2 al 10: valor nominal
  - J, Q, K: valen 10 puntos
  - As: vale 11 o 1 (automáticamente se ajusta si el jugador se pasa)

### Mecánica del juego
- El jugador puede "Pedir Carta" o "Plantarse"
- Si el jugador se pasa de 21, pierde automáticamente
- Si el jugador se planta, el crupier juega automáticamente
- El crupier debe pedir carta hasta tener al menos 17 puntos
- Gana quien tenga más puntos sin pasarse de 21
- En caso de empate, se devuelve la apuesta al jugador

### Sistema de apuestas
- La apuesta se resta del saldo al iniciar la partida
- Si el jugador gana, recibe el doble de su apuesta
- Si pierde, no recupera nada
- Si empata, recupera su apuesta

### Interfaz visual
- Mostrar las cartas del jugador y del crupier con su palo y valor
- Una carta del crupier debe estar oculta durante el turno del jugador
- Mostrar el saldo actual del jugador
- Mostrar la puntuación de ambas manos
- Indicar claramente el resultado de cada partida

### Controles del juego
- Botón para iniciar partida
- Botones para pedir carta y plantarse
- Botón para nueva partida después de terminar
- Botón para reiniciar juego completo cuando se agota el saldo

## Restricciones técnicas
- Solo modificar el archivo App.jsx
- No usar `break` en ninguna parte del código
- Cada función debe tener un único `return`
- Usar `useState` y `useEffect` apropiadamente
- Implementar correctamente el sistema de valores del As

## Criterios de evaluación
- Correcto funcionamiento de las reglas del BlackJack
- Lógica de apuestas implementada correctamente
- Interfaz clara y funcional
- Código limpio sin `break` y con un solo `return` por función
- Correcto manejo del valor del As (11 o 1)
