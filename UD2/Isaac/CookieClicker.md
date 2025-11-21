### Enunciado del Problema: Crear un **Cookie Clicker** usando React con `useReducer`

#### Introducción
En este proyecto, desarrollarás una versión básica del popular juego **Cookie Clicker**, donde los usuarios generan galletas haciendo clic y pueden mejorar su capacidad para generar galletas comprando diferentes elementos. Implementarás este proyecto utilizando el hook `useReducer` para gestionar el estado global del juego.

#### Requisitos

1. **Interfaz básica**:
   - Un contador que muestra el número actual de galletas acumuladas.
   - Un botón para hacer clic y generar galletas manualmente.

2. **Elementos mejorables**:
   Los usuarios pueden gastar sus galletas en los siguientes elementos:
   
   - **Cursores**:
     - Cada cursor genera **0.1 galletas por segundo** automáticamente.
     - Precio inicial: **15 galletas**.
     - El precio aumenta en un **10%** cada vez que compras un cursor.

   - **Multiplicadores de clicks**:
     - Aumentan la cantidad de galletas generadas por cada clic.
     - Precio inicial: **50 galletas**.
     - El precio aumenta en un **20%** con cada compra.

   - **Abuelas**:
     - Cada abuela genera **1 clic automático por segundo**.
     - Precio inicial: **100 galletas**.
     - El precio aumenta en un **30%** cada vez que compras una abuela.

3. **Lógica del juego**:
   - Usa `useReducer` para manejar el estado del juego, que incluirá:
     - `cookies`: Número de galletas actuales.
     - `cursorCount`: Número de cursores comprados.
     - `clickMultiplier`: Nivel del multiplicador de clics.
     - `grandmaCount`: Número de abuelas compradas.
     - Otros datos necesarios, como los precios de los elementos.

4. **Restricciones**:
   - Un usuario no puede comprar un elemento si no tiene suficientes galletas.
   - Los cálculos de generación automática de galletas deben ejecutarse cada segundo.

5. **Simulación del tiempo**:
   - Usa `setInterval` para calcular la generación automática de galletas de los cursores y abuelas.
   - La lógica debe estar correctamente integrada con el estado manejado por `useReducer`.

#### Pistas

- **Acciones del Reducer**:
  Define acciones claras como:
  - `CLICK_COOKIE`: Incrementa las galletas por clic (considerando el multiplicador).
  - `BUY_CURSOR`: Actualiza el número de cursores, su precio y las galletas disponibles.
  - `BUY_MULTIPLIER`: Incrementa el multiplicador de clics, actualiza su precio y disminuye las galletas disponibles.
  - `BUY_GRANDMA`: Actualiza el número de abuelas, su precio y las galletas disponibles.
  - `GENERATE_COOKIES`: Calcula las galletas generadas automáticamente.

- **Estructura inicial del estado**:
  ```javascript
  const initialState = {
    cookies: 0,
    cursorCount: 0,
    clickMultiplier: 1,
    grandmaCount: 0,
    cursorPrice: 15,
    multiplierPrice: 50,
    grandmaPrice: 100,
  };
  ```

- **Lógica de precios**:
  Los precios deben recalcularse usando fórmulas como:
  ```javascript
  const newPrice = Math.floor(price * 1.1); // Para cursores, ajusta el multiplicador para otros.
  ```