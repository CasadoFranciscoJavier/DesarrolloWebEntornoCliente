# Ejercicio 1: Carrera de Caballos

## Objetivo
Crear un juego de carrera de caballos con sistema de apuestas utilizando React y hooks.

## Requisitos funcionales

### Configuración inicial
- El juego debe permitir elegir entre 2 y 6 caballos participantes
- Cada jugador debe tener un saldo inicial de $100
- El jugador debe poder configurar el monto de su apuesta antes de cada carrera

### Sistema de apuestas
- Antes de iniciar la carrera, el jugador debe seleccionar a qué caballo apuesta
- El monto apostado se resta del saldo del jugador al iniciar la carrera
- Si el caballo seleccionado gana, el jugador recibe su apuesta multiplicada por el número de caballos participantes
- Si pierde, no recupera el monto apostado

### Mecánica de carrera
- Cada caballo avanza de forma aleatoria en cada turno (entre 1 y 5 posiciones)
- La carrera avanza automáticamente cada 200ms
- El primer caballo en llegar a la meta (100 posiciones) gana
- La carrera debe detenerse automáticamente cuando hay un ganador

### Interfaz visual
- Mostrar visualmente las pistas de carrera con los caballos
- Cada caballo debe representarse con un emoji diferente
- Mostrar claramente qué caballo es el ganador
- Mostrar el saldo actual del jugador en todo momento
- Indicar visualmente sobre qué caballo se ha apostado

### Controles del juego
- Botón para iniciar la carrera (solo activo si se ha realizado una apuesta)
- Opción para nueva carrera después de finalizar
- Opción para reiniciar el juego completo cuando se agota el saldo

## Restricciones técnicas
- Solo modificar el archivo App.jsx
- No usar `break` en ninguna parte del código
- Cada función debe tener un único `return`
- Usar `useState` y `useEffect` apropiadamente
- El juego debe ser escalable (número de caballos configurable)

## Criterios de evaluación
- Correcto uso de hooks de React
- Lógica de apuestas y saldo implementada correctamente
- Interfaz intuitiva y funcional
- Código limpio sin `break` y con un solo `return` por función
- Escalabilidad del número de caballos
