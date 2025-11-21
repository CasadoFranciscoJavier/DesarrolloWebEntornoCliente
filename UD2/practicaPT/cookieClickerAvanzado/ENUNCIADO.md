### Enunciado: **Cookie Clicker Avanzado** con Context API y useReducer

#### Introducción
Desarrolla una versión avanzada del Cookie Clicker con nuevas mecánicas de juego. Utiliza `useReducer` dentro de un Context Provider para gestionar el estado global y compartirlo entre componentes.

#### Requisitos

1. **Interfaz básica**:
   - Contador de galletas acumuladas
   - Botón para generar galletas manualmente
   - Botón para iniciar/pausar el juego
   - Botón para reiniciar el juego

2. **Elementos mejorables**:

   - **Cursores**:
     - Generan **0.1 galletas/segundo** automáticamente
     - Precio inicial: **15 galletas**
     - Incremento de precio: **10%** por compra

   - **Multiplicadores de clicks**:
     - Aumentan galletas por clic
     - Precio inicial: **50 galletas**
     - Incremento de precio: **20%** por compra

   - **Abuelas**:
     - Generan **1 galleta/segundo** automáticamente
     - Precio inicial: **100 galletas**
     - Incremento de precio: **30%** por compra

   - **Fábricas** (NUEVO):
     - Generan **5 galletas/segundo** automáticamente
     - Precio inicial: **500 galletas**
     - Incremento de precio: **40%** por compra

   - **Potenciador temporal** (NUEVO):
     - Multiplica por **3** la producción durante **10 segundos**
     - Costo: **200 galletas**
     - No se puede activar si ya está activo

3. **Lógica del juego**:
   - Usa `useReducer` dentro de un Context Provider
   - Comparte el estado entre componentes usando `useContext`
   - El juego debe poder pausarse y reanudarse
   - El juego debe poder reiniciarse completamente

4. **Restricciones**:
   - No se puede comprar sin galletas suficientes
   - La generación automática solo funciona si el juego NO está pausado
   - Los precios se redondean con `Math.round()`

5. **Componentes separados**:
   - `GameContext.jsx`: Context Provider con useReducer
   - `Contador.jsx`: Muestra galletas actuales
   - `BotonClic.jsx`: Botón para generar galletas
   - `Controles.jsx`: Botones de pausar/reanudar/reiniciar
   - `Mejoras.jsx`: Lista de mejoras disponibles
   - `App.jsx`: Componente principal
