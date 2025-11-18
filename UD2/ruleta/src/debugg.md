Empiezo **desde cero** y hago un **debug paso a paso** del flujo completo de tu app, indicando **archivo** y **línea** (números basados en el código que pegaste). Haré el recorrido real que ocurre cuando un usuario juega: clic en tablero → modal → confirmar apuesta → girar ruleta → cálculo y resultado. Cada paso incluye **qué hace**, **qué variables cambian**, **qué funciones se llaman** y **ejemplos concretos** de valores.

---

## Resumen de archivos y líneas clave (rápido)

* `App.jsx` — entrada y lógica principal. (archivo principal)

  * `infoCasillas` — datos de casillas (línea **10**).
  * `estadoInicial` — estado inicial del juego (línea **33**).
  * `ruletaReducer` — lógica del reducer (empieza en línea **45**).
  * `RuletaContext = createContext()` (línea **182**).
  * `RuletaProvider` (línea **187**).
  * `useRuleta` hook (línea **200**).
  * `obtenerInfoNumero` (línea **207**).
  * `obtenerTextoApuesta` (línea **224**).
  * `function RuletaJuego()` (línea **246**).

    * `const abrirModal = (tipo, valor) => {` — **línea 255**.
    * `const confirmarApuesta = () => {` — **línea 275**.
    * `const girarRuleta = () => {` — **línea 296**.
  * `<Tablero alAbrirModal={abrirModal} />` — el Tablero es incluido en **línea 355**.
* `Tablero.jsx`

  * `function Tablero({ alAbrirModal }) {` — empieza **línea 49** del propio archivo Tablero.
  * botón 0: `onClick={() => alAbrirModal('numero', 0)}` — **línea 53** del Tablero.
  * columnas/docenas/par/color: llamadas a `alAbrirModal(...)` en **líneas 60, 65, 70, 73–81** (aprox. en Tablero).
  * `BotonNumero` componente (línea **35** del Tablero).
* `ModalApuesta.jsx`

  * `function ModalApuesta({...})` — archivo empieza en **línea 1** del Modal.
  * `onClick={alConfirmar}` botón confirmar — **línea 28** del Modal.
* `RuletaGiratoria.jsx`

  * `function RuletaGiratoria({ estaGirando, puedeGirar, alGirar })` — **línea 5** del archivo.

---

## Flujo completo y detallado (debug, línea a línea)

### 0) Inicio: React monta `App.jsx`

* **Archivo/entrada:** `App.jsx` (línea 1 import y componente `App` al final).
* **Efecto:** `App()` devuelve:

  ```jsx
  <RuletaProvider>
    <RuletaJuego />
  </RuletaProvider>
  ```

  Eso quiere decir que **antes de montar `RuletaJuego`** se ejecuta `RuletaProvider` (línea **187**) que crea el estado global con `useReducer(ruletaReducer, estadoInicial)`.

---

### 1) `RuletaProvider` crea el contexto y el estado global (líneas ~182–200)

* **Línea 182:** `const RuletaContext = createContext();` — declara el “canal” para compartir datos.

  * **Qué significa**: crea un identificador (objeto interno de React). Por sí solo no contiene datos, solo el *sitio* donde luego meterás datos.
* **Línea 187:** `RuletaProvider` usa `useReducer(ruletaReducer, estadoInicial)`.

  * `estadoInicial` (línea **33**) define:

    ```js
    { saldo: 100, apuestasActivas: [], numeroGanador: null, colorGanador: null, mensajeResultado: "", totalApostado: 0 }
    ```
  * `useReducer` devuelve `[estado, dispatch]`. `estado` es el estado actual; `dispatch` es la forma de pedir cambios.
* **Qué hace el Provider**: renderiza `<RuletaContext.Provider value={{ estado, dispatch }}>` (línea **190**), así **expones** `estado` y `dispatch` a cualquier componente hijo que use `useContext(RuletaContext)` (o tu `useRuleta()` en línea **200**).

  * **Analogía**: Provider es la casilla central donde se guarda el estado; `dispatch` es la puerta para pedir cambios.

---

### 2) Montaje de la UI: `RuletaJuego` (línea **246**)

* React renderiza `RuletaJuego` dentro del Provider. Dentro de `RuletaJuego` (líneas ~246–end) se establecen estados locales del componente:

  * `estaGirando` (useState) — control visual/animación de la ruleta.
  * `modalAbierto` — controla si se muestra el `ModalApuesta`.
  * `apuestaTemporal`, `tipoApuestaActual`, `valorApuestaActual`, `errorModal` — datos temporales del modal.
* **Ejemplo en memoria**: al arrancar `estado` global tiene `saldo=100`, `apuestasActivas=[]`.

---

### 3) El Tablero se renderiza y **recibe** la función `abrirModal` (línea **355**)

* **Línea 355 (App.jsx):**

  ```jsx
  <Tablero alAbrirModal={abrirModal} />
  ```

  * El padre (`RuletaJuego`) le pasa a `Tablero` la función `abrirModal` como prop llamada `alAbrirModal`.
  * **Importante**: en `Tablero` lo verás como `function Tablero({ alAbrirModal })` (Tablero línea **49**). No existe un `alAbrirModal` "magicamente" dentro de Tablero: lo recibe por props desde el padre.

---

### 4) Haces clic en una casilla del Tablero (ejemplo: número 12)

* **En `Tablero.jsx`**, cada número tiene un botón. Por ejemplo la casilla 0 está en Tablero **línea 53**:

  ```jsx
  <button className="cero" onClick={() => alAbrirModal('numero', 0)}>0</button>
  ```
* Para las filas superiores, Tablero usa `BotonNumero` (línea **35**) que hace:

  ```jsx
  <button className={`numero ${claseColor}`} onClick={() => onClick('numero', numero)}>{numero}</button>
  ```

  donde `onClick` es exactamente la prop que le pasaste `alAbrirModal`.
* **Flujo real** (ejemplo práctico):

  * Usuario pulsa el botón del número 12 en la UI.
  * `Tablero` ejecuta `alAbrirModal('numero', 12)`.
  * Eso invoca la función `abrirModal` definida en `RuletaJuego` (línea **255** en App.jsx).

---

### 5) `abrirModal(tipo, valor)` (App.jsx — **línea 255**)

* Código:

  ```js
  const abrirModal = (tipo, valor) => {
    setTipoApuestaActual(tipo);
    setValorApuestaActual(valor);
    setApuestaTemporal(5);
    setErrorModal("");
    setModalAbierto(true);
  };
  ```

* **Qué hace exactamente (por orden):**

  1. Guarda en estado local `tipoApuestaActual` = `"numero"`.
  2. Guarda `valorApuestaActual` = `12`.
  3. Resetea `apuestaTemporal` a 5 (cantidad por defecto para el modal).
  4. Limpia cualquier error previo.
  5. Abre `modalAbierto = true` → React vuelve a renderizar y `ModalApuesta` aparece.

* **Ejemplo práctico en memoria después de esto**:

  * `tipoApuestaActual="numero"`, `valorApuestaActual=12`, `apuestaTemporal=5`, `modalAbierto=true`.

---

### 6) Modal: elegir cantidad y confirmar (archivo `ModalApuesta.jsx`)

* `ModalApuesta` recibe props desde `RuletaJuego` (App.jsx): `estaAbierto`, `saldo`, `apuestaTemporal`, `errorModal`, `alAumentar`, `alDisminuir`, `alCancelar`, `alConfirmar`.
* **Botón confirmar** del Modal llama `alConfirmar`, que está ligado a `confirmarApuesta()` en `RuletaJuego` (App.jsx — **línea 275**).

---

### 7) `confirmarApuesta()` (App.jsx — **línea 275**)

* Código clave:

  ```js
  if (apuestaTemporal < 5) { setErrorModal("La apuesta mínima es 5€"); return; }
  if (apuestaTemporal > estado.saldo) { setErrorModal("No tienes suficiente saldo"); return; }

  const nuevaApuesta = {
    tipoApuesta: tipoApuestaActual,
    valor: valorApuestaActual,
    cantidad: apuestaTemporal
  };

  dispatch({ tipo: "AGREGAR_APUESTA", apuesta: nuevaApuesta });
  setModalAbierto(false);
  ```
* **Qué ocurre**:

  1. Valida la cantidad (mínimo 5, no mayor que saldo).
  2. Construye el objeto `nuevaApuesta`.

     * Ejemplo real: `{ tipoApuesta: "numero", valor: 12, cantidad: 10 }` si el usuario cambió `apuestaTemporal` a 10.
  3. Llama `dispatch({ tipo: "AGREGAR_APUESTA", apuesta: nuevaApuesta })`.
  4. Cierra el modal localmente (`modalAbierto=false`).

---

### 8) Reducer recibe la acción `AGREGAR_APUESTA` (App.jsx — **ruletaReducer**, inicio **línea 45**, AGREGAR_APUESTA en **línea 48**)

* Entrada: `accion.tipo == "AGREGAR_APUESTA"`, `accion.apuesta == nuevaApuesta`.

* Código (resumen):

  * Calcula `nuevoSaldo = estado.saldo - nuevaApuesta.cantidad`.
  * Calcula `nuevoTotalApostado = estado.totalApostado + nuevaApuesta.cantidad`.
  * Agrega la apuesta a `apuestasActivas`.
  * Devuelve `nuevoEstado` con esas actualizaciones.

* **Ejemplo concreto**:

  * Estado antes: `saldo=100`, `apuestasActivas=[]`, `totalApostado=0`.
  * Acción: `AGREGAR_APUESTA` con `{ tipoApuesta:"numero", valor:12, cantidad:10 }`.
  * Resultado (nuevo estado): `saldo=90`, `apuestasActivas=[{...}]`, `totalApostado=10`.

* **Efecto en UI**: React re-renderiza; ahora verás la apuesta en el listado (render en App.jsx donde `estado.apuestasActivas.map` aparece).

---

### 9) Verificación visual: lista de apuestas activas (App.jsx — sección render)

* `RuletaJuego` muestra el bloque:

  ```jsx
  {estado.apuestasActivas.length > 0 && (
    <div className="apuestasActivas"> ... {estado.apuestasActivas.map((apuesta,index)=> (...))} </div>
  )}
  ```
* **Qué ves**: línea en código donde se mappea y llama a `obtenerTextoApuesta(apuesta)` (render de texto legible). `obtenerTextoApuesta` está en App.jsx (línea **224**) y usa `obtenerInfoNumero` (línea **207**) para añadir color en apuestas a número.

---

### 10) Hacer múltiples apuestas

* Puedes repetir pasos 4→9 para añadir varias apuestas. Cada `confirmarApuesta()` invoca `dispatch("AGREGAR_APUESTA")` y el reducer acumula apuestas y descuenta saldo.
* `totalApostado` (estado global) acumula la suma de todas las apuestas realizadas actualmente (útil para mensaje final).

---

### 11) Girar la ruleta: `girarRuleta()` (App.jsx — **línea 296**)

* Antes de llamar a `girarRuleta`, el botón de la palanca en `RuletaGiratoria.jsx` (archivo separado) llama `alGirar={girarRuleta}` (App.jsx pasa esa prop en la línea del componente RuletaGiratoria).
* En `RuletaGiratoria.jsx` (línea **5** del archivo) el botón hace `onClick={alGirar}`.

**Dentro de `girarRuleta()` (App.jsx):**

```js
if (estado.apuestasActivas.length == 0) { alert(...); return; }
setEstaGirando(true);
dispatch({ tipo: "LIMPIAR_MENSAJE" });
setTimeout(() => {
  dispatch({ tipo: "GIRAR_RULETA" });
  setEstaGirando(false);
}, 3000);
```

* **Qué hace**:

  1. Verifica que haya apuestas; si no, muestra alerta.
  2. Arranca animación `estaGirando=true`.
  3. Limpia mensaje previo con `dispatch({ tipo: "LIMPIAR_MENSAJE" })`.
  4. Espera 3s (simula giro), luego despacha `GIRAR_RULETA` al reducer.
  5. Para la animación `estaGirando=false`.

---

### 12) Reducer recibe `GIRAR_RULETA` (App.jsx — en `ruletaReducer`, rama **línea 60** y siguientes)

* **Genera número ganador**:

  ```js
  const numeroAleatorio = Math.floor(Math.random() * 37); // 0..36
  ```

  Ejemplo real: `numeroAleatorio = 17`.
* **Busca su color** recorriendo `infoCasillas` (bucle `while` en líneas siguientes). Resultado ejemplo: `colorDelNumero = "Negro"`.
* **Revisa cada apuesta activa** (bucle `while` sobre `estado.apuestasActivas`):

  * Para cada apuesta comprueba el tipo:

    * `numero` → si `apuesta.valor == numeroAleatorio` → multiplicador = 36.
    * `color` → si `apuesta.valor == colorDelNumero` y `colorDelNumero !== "Verde"` → multiplicador = 2.
    * `parImpar` → si `numeroAleatorio !== 0` y par/impar coincide → multiplicador = 2.
    * `docena` → verifica rangos 1-12 / 13-24 / 25-36 → multiplicador = 3.
    * `columna` → busca en arrays `filaSuperior`, `filaMedia`, `filaInferior` con bucles (no `find`) → multiplicador = 3 si coincide.
  * Si gana la apuesta, suma a `gananciasTotal` la `apuesta.cantidad * multiplicador`.
* **Calcula nuevo saldo**: `nuevoSaldo = estado.saldo + gananciasTotal`.

  * Nota: el código trata las apuestas restadas ya cuando se añadieron (en AGREGAR_APUESTA); aquí sólo suma lo ganado.
* **Construye `mensaje`**:

  * Si `gananciasTotal > 0`: mensaje con ganancia bruta y neta.
  * Si no: mensaje de pérdida con el `totalApostado`.
* **Limpia apuestas y totalApostado**:

  * `apuestasActivas: []`, `totalApostado: 0`
* **Devuelve `nuevoEstado`** con `numeroGanador`, `colorGanador`, `saldo`, `mensajeResultado`, etc.

---

### 13) Después del `dispatch("GIRAR_RULETA")`

* `RuletaJuego` re-renderiza con nuevo `estado` global:

  * `estado.numeroGanador` ya no es `null` (por ejemplo 17).
  * `estado.colorGanador` = `"Negro"`.
  * `estado.mensajeResultado` muestra el detalle.
  * `estado.saldo` se ha actualizado con ganancias o sin ellas.
  * `estado.apuestasActivas` ya está vacía.
* UI: la sección

  ```jsx
  {estado.numeroGanador !== null && (
    <div className="resultadoContainer">
      <h1>Resultado: {estado.numeroGanador} {estado.colorGanador}</h1>
      <p className="mensajeResultado">{estado.mensajeResultado}</p>
    </div>
  )}
  ```

  se muestra con el resultado (esta sección está en `App.jsx` en la parte del render).

---

## Punto a punto con referencias concretas (ejemplo de ejecución completa)

1. **Usuario abre app** → `App.jsx` carga y crea Provider (línea **187**) con estado inicial (línea **33**).
2. **Usuario hace clic en número 12** → `Tablero` ejecuta (Tablero línea **58** o el botón correspondiente) `alAbrirModal('numero', 12)`; esa función es `abrirModal` del padre (App.jsx línea **255**).
3. **`abrirModal('numero',12)`** (línea **255**):

   * fija `tipoApuestaActual="numero"`, `valorApuestaActual=12`, `apuestaTemporal=5`, `modalAbierto=true`.
4. **Modal aparece** (ModalApuesta.jsx) y el usuario sube cantidad a 10€ y hace click en confirmar (Modal botón confirmar línea **28**).
5. **`confirmarApuesta()`** (App.jsx línea **275**):

   * crea `nuevaApuesta = { tipoApuesta:"numero", valor:12, cantidad:10 }`
   * `dispatch({ tipo: "AGREGAR_APUESTA", apuesta: nuevaApuesta });`
6. **Reducer `AGREGAR_APUESTA`** (App.jsx ruletaReducer, línea **48**):

   * actualiza `saldo` → `100 - 10 = 90`
   * `apuestasActivas` → contiene la apuesta
   * `totalApostado` → 10
7. **Usuario repite o pulsa girar**:

   * pulsa palanca (componente `RuletaGiratoria` que recibió `alGirar={girarRuleta}` desde App.jsx).
   * `girarRuleta()` (App.jsx línea **296**) valida y despacha `LIMPIAR_MENSAJE` y tras 3s `GIRAR_RULETA`.
8. **Reducer `GIRAR_RULETA`** (App.jsx, dentro de `ruletaReducer`, bloque desde línea **60 en adelante**):

   * genera número aleatorio (ej. 17).
   * busca color (recorre infoCasillas con `while`).
   * recorre `apuestasActivas`, calcula `gananciasTotal`.
   * actualiza `saldo`, `numeroGanador`, `colorGanador`, `mensajeResultado`. Vacia `apuestasActivas`.
9. **Resultado mostrado** (App.jsx sección render — justo antes del `RuletaGiratoria` en el JSX).

---

## Notas prácticas y puntos de atención (debug / errores comunes)

* **`<Tablero alAbrirModal={abrirModal} />` (App.jsx línea 355)**: recuerda que Tablero no define `alAbrirModal`; lo **recibe**. Si ves `alAbrirModal` dentro de Tablero, es sólo la prop que el padre le pasó.
* **`abrirModal` existe en `RuletaJuego`** — **línea 255**. No busques `alAbrirModal` con `function` en App.jsx; `alAbrirModal` existe sólo como el nombre de la prop en Tablero.
* **Variables / nombres**: `estado` (global) vs `estado` (local) — en `RuletaJuego` tomas `const { estado, dispatch } = useRuleta();` (línea **246**), así que `estado` es el objeto global del Provider.
* **Reducer: una sola salida** — `ruletaReducer` construye `nuevoEstado` y al final lo retorna (una sola `return nuevoEstado;`). Si añades cambios, hazlos sobre `nuevoEstado` en el reducer.
* **Búsqueda de color**: usa `while` para iterar (evitas métodos avanzados que dijiste no usar).
* **Comprueba `apuestaTemporal`** antes de dispatch; el modal hace validaciones (línea **275**).
* **Animación y timing**: `setTimeout` de 3000ms en `girarRuleta` (línea **299** aprox.) coordina la animación y el `dispatch("GIRAR_RULETA")`.
* **Descuentos y ganancias**: cuando añades una apuesta se descuenta el dinero (en AGREGAR_APUESTA). Cuando GIRA se suman ganancias (si las hay). Por tanto el saldo final es correcto.

---

Si quieres ahora hago **una versión con marcadores de línea en el propio código** (comentar cada bloque con `// LINEA XX`).
O si prefieres, te doy **un checklist de debugging** para probar en consola (por ejemplo `console.log` en estas líneas concretas) que te dice exactamente qué imprimir y dónde para ver las variables en cada paso. ¿Cuál prefieres?
