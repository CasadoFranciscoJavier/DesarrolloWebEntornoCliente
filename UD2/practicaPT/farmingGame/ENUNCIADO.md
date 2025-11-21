### Enunciado: **Farming Game** con Context API y useReducer

#### Introducción
Desarrolla un juego de granja donde plantas cultivos, esperas a que crezcan, los cosechas y vendes por dinero. Con ese dinero compras mejoras. Utiliza `useReducer` dentro de un Context Provider para gestionar el estado global.

#### Requisitos

1. **Interfaz básica**:
   - Contador de dinero
   - Parcelas de cultivo (3 parcelas)
   - Estado de cada parcela (vacía, plantada, lista para cosechar)
   - Tiempo de crecimiento de cada parcela
   - Controles del juego (iniciar/pausar/reiniciar)

2. **Sistema de cultivos**:

   - **Trigo**:
     - Coste: 10 monedas
     - Tiempo de crecimiento: 5 segundos
     - Valor de venta: 25 monedas
     - Ganancia: +15 monedas

   - **Maíz**:
     - Coste: 30 monedas
     - Tiempo de crecimiento: 10 segundos
     - Valor de venta: 70 monedas
     - Ganancia: +40 monedas

   - **Tomate**:
     - Coste: 50 monedas
     - Tiempo de crecimiento: 15 segundos
     - Valor de venta: 120 monedas
     - Ganancia: +70 monedas

3. **Mecánicas del juego**:
   - Empiezas con 50 monedas
   - Tienes 3 parcelas para plantar
   - Plantar: seleccionas cultivo y parcela vacía
   - Cada segundo reduce tiempo de crecimiento
   - Cuando llega a 0, puedes cosechar
   - Cosechar: ganas dinero y parcela queda vacía
   - No puedes plantar sin dinero suficiente

4. **Mejoras disponibles**:

   - **Parcela extra**:
     - Precio inicial: 200 monedas
     - Incremento: 50% por compra
     - Efecto: +1 parcela (máximo 6 parcelas)

   - **Fertilizante** (temporal):
     - Precio: 100 monedas
     - Duración: 30 segundos
     - Efecto: Crecimiento x2 (reduce tiempo a la mitad)

   - **Cosecha automática**:
     - Precio inicial: 300 monedas
     - Incremento: 100% por compra
     - Efecto: Cosecha automática cuando cultivo está listo

5. **Controles del juego**:
   - Botón "Iniciar" para empezar
   - Botón "Pausar/Reanudar"
   - Botón "Reiniciar"
   - Pausar detiene el tiempo de crecimiento

6. **Lógica del juego**:
   - Usa `useReducer` dentro de Context Provider
   - El tiempo solo avanza si está iniciado y no pausado
   - Si hay fertilizante activo, tiempo se reduce más rápido
   - Cosecha automática funciona si está comprada

7. **Componentes separados**:
   - `GameContext.jsx`: Provider con useReducer
   - `InfoJuego.jsx`: Muestra dinero y estado del fertilizante
   - `Parcela.jsx`: Muestra una parcela individual
   - `Parcelas.jsx`: Muestra todas las parcelas
   - `Plantar.jsx`: Botones para plantar cada cultivo
   - `Mejoras.jsx`: Botones de mejoras
   - `Controles.jsx`: Botones de control
   - `App.jsx`: Componente principal
