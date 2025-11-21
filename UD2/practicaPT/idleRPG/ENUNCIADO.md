### Enunciado: **Idle RPG** con Context API y useReducer

#### Introducción
Desarrolla un juego RPG idle donde luchas contra monstruos, ganas oro y compras equipo para mejorar tu personaje. Utiliza `useReducer` dentro de un Context Provider para gestionar el estado global.

#### Requisitos

1. **Interfaz básica**:
   - Estadísticas del jugador (vida, ataque, defensa)
   - Oro acumulado
   - Información del monstruo actual
   - Botón para atacar monstruo
   - Controles del juego (iniciar/pausar/reiniciar)

2. **Sistema de combate**:
   - **Jugador**:
     - Vida inicial: 100
     - Ataque base: 10
     - Defensa base: 0

   - **Monstruos**:
     - Nivel 1: 50 vida, 5 ataque, 10 oro
     - Nivel escala: +20 vida, +3 ataque, +15 oro por nivel

3. **Mecánica de combate**:
   - Atacar monstruo: jugador ataca primero
   - Daño jugador = ataque - defensa monstruo
   - Daño monstruo = ataque monstruo - defensa jugador
   - Si monstruo muere: ganas oro, aparece siguiente nivel
   - Si jugador muere: Game Over

4. **Tienda de equipo**:

   - **Espada** (mejora ataque):
     - Precio inicial: 50 oro
     - Incremento: 30% por compra
     - Efecto: +5 ataque

   - **Escudo** (mejora defensa):
     - Precio inicial: 40 oro
     - Incremento: 25% por compra
     - Efecto: +3 defensa

   - **Poción de vida**:
     - Precio fijo: 30 oro
     - Efecto: +50 vida (máximo 100)

   - **Armadura** (mejora vida máxima):
     - Precio inicial: 100 oro
     - Incremento: 40% por compra
     - Efecto: +20 vida máxima

5. **Controles del juego**:
   - Botón "Iniciar" para empezar
   - Botón "Pausar/Reanudar"
   - Botón "Reiniciar" para volver al inicio
   - Pausar detiene el combate automático

6. **Lógica del juego**:
   - Usa `useReducer` dentro de Context Provider
   - Combate manual con botón de ataque
   - No se puede comprar sin oro suficiente
   - Game Over si la vida del jugador llega a 0

7. **Componentes separados**:
   - `GameContext.jsx`: Provider con useReducer
   - `EstadisticasJugador.jsx`: Muestra stats del jugador
   - `Monstruo.jsx`: Muestra monstruo actual
   - `Combate.jsx`: Botón de ataque
   - `Tienda.jsx`: Botones de compras
   - `Controles.jsx`: Botones de control
   - `App.jsx`: Componente principal
