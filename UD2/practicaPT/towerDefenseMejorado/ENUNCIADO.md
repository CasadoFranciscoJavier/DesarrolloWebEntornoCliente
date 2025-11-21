### Enunciado: **Tower Defense Mejorado** con Context API y useReducer

#### Introducción
Desarrolla un juego de Tower Defense con sistema de oleadas, donde debes derrotar enemigos antes de que se acabe el tiempo. Utiliza `useReducer` dentro de un Context Provider para gestionar el estado global.

#### Requisitos

1. **Interfaz básica**:
   - Contador de puntos ganados
   - Información de oleada actual y enemigos restantes
   - Temporizador de oleada
   - Botones de controles (Iniciar/Pausar/Reiniciar)
   - Barra de vida del enemigo actual

2. **Sistema de combate**:
   - Click en enemigo para atacar
   - Daño por clic manual
   - Daño automático por segundo
   - Enemigos con vida escalable por oleada

3. **Sistema de oleadas**:
   - Oleada 1: 5 enemigos con 20 de vida
   - Cada oleada aumenta:
     - Vida enemigo: +10 por oleada
     - Cantidad enemigos: +1 por oleada
   - Tiempo límite: 20 segundos por oleada
   - Game Over si no terminas a tiempo

4. **Mejoras disponibles**:

   - **Daño por clic**:
     - Precio inicial: 20 puntos
     - Incremento: 20% por compra
     - Efecto: +1 daño por clic

   - **Daño automático**:
     - Precio inicial: 30 puntos
     - Incremento: 15% por compra
     - Efecto: +1 daño/segundo

   - **Mega Click** (temporal):
     - Costo: 50 puntos
     - Duración: 10 segundos
     - Efecto: Daño por clic x2

5. **Controles del juego**:
   - Botón "Iniciar" para comenzar
   - Botón "Pausar/Reanudar" durante partida
   - Botón "Reiniciar" para empezar de nuevo
   - Pausar detiene: timer, daño automático, oleadas

6. **Lógica del juego**:
   - Usa `useReducer` dentro de Context Provider
   - Ganar puntos al derrotar enemigos (+5 puntos)
   - El timer se reinicia al pasar de oleada
   - Game Over si el tiempo llega a 0 con enemigos vivos

7. **Componentes separados**:
   - `GameContext.jsx`: Provider con useReducer
   - `InfoJuego.jsx`: Muestra oleada, tiempo, puntos
   - `Enemigo.jsx`: Muestra enemigo actual y botón atacar
   - `Controles.jsx`: Botones iniciar/pausar/reiniciar
   - `Mejoras.jsx`: Botones de mejoras
   - `App.jsx`: Componente principal
