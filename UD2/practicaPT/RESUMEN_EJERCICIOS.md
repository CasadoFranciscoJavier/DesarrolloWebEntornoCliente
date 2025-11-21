# 📚 Resumen de Ejercicios - Preparación Prueba Técnica

## Ejercicios Creados

### 1. 🍪 Cookie Clicker Avanzado
**Ubicación:** `cookieClickerAvanzado/`

**Conceptos clave:**
- Context API + useReducer
- useEffect con setInterval
- Múltiples mejoras escalables
- Sistema de potenciadores temporales
- Controles de juego (pausar/reanudar/reiniciar)

**Componentes:**
- `GameContext.jsx` - Provider con useReducer
- `Contador.jsx` - Muestra galletas
- `BotonClic.jsx` - Generar galletas
- `Controles.jsx` - Pausar/reanudar/reiniciar
- `Mejoras.jsx` - Comprar mejoras
- `App.jsx` - Componente principal

**Estructura del reducer:**
```javascript
function gameReducer(state, action) {
  let outputState = state;

  if (action.type == 'ACCION') {
    // lógica
  }

  return outputState;
}
```

---

### 2. 🏰 Tower Defense Mejorado
**Ubicación:** `towerDefenseMejorado/`

**Conceptos clave:**
- Sistema de oleadas progresivas
- Timer con Game Over
- useEffect para generación de enemigos
- Barra de progreso con Bootstrap
- Escalado de dificultad

**Componentes:**
- `GameContext.jsx` - Provider con useReducer
- `InfoJuego.jsx` - Oleada, tiempo, puntos
- `Enemigo.jsx` - Enemigo actual con barra de vida
- `Combate.jsx` - Botón de ataque
- `Controles.jsx` - Controles del juego
- `Mejoras.jsx` - Mejoras de daño
- `App.jsx` - Principal con Game Over

**Patrón de useEffect para lógica de oleadas:**
```javascript
useEffect(() => {
  if (state.saludEnemigo <= 0 && state.enemigosRestantes > 0) {
    dispatch({ type: 'GENERAR_ENEMIGO' })
  }
  if (state.saludEnemigo <= 0 && state.enemigosRestantes == 0) {
    dispatch({ type: 'NUEVA_OLEADA' })
  }
}, [state.saludEnemigo, state.enemigosRestantes]);
```

---

### 3. ⚔️ Idle RPG
**Ubicación:** `idleRPG/`

**Conceptos clave:**
- Sistema de combate por turnos
- Escalado de monstruos por nivel
- Tienda con múltiples mejoras
- Game Over cuando vida llega a 0
- Barras de progreso para vida

**Componentes:**
- `GameContext.jsx` - Provider con useReducer
- `EstadisticasJugador.jsx` - Vida, oro, stats
- `Monstruo.jsx` - Info del monstruo
- `Combate.jsx` - Botón de ataque
- `Tienda.jsx` - Comprar equipo
- `Controles.jsx` - Controles
- `App.jsx` - Principal con Game Over

**Patrón de cálculo de daño:**
```javascript
const danioAlMonstruo = Math.max(state.ataqueJugador, 1); // Mínimo 1
const danioAlJugador = Math.max(state.ataqueMonstruo - state.defensaJugador, 1);
```

---

### 4. 🌾 Farming Game
**Ubicación:** `farmingGame/`

**Conceptos clave:**
- Arrays en el estado (parcelas)
- map() sin índice como variable suelta
- for loop con incremento explícito
- Datos externos al reducer (CULTIVOS)
- Sistema de temporizadores múltiples

**Componentes:**
- `GameContext.jsx` - Provider con useReducer y CULTIVOS
- `InfoJuego.jsx` - Dinero y estado
- `Parcela.jsx` - Parcela individual
- `Parcelas.jsx` - Mapeo de parcelas
- `Plantar.jsx` - Botones de cultivos
- `Mejoras.jsx` - Comprar mejoras
- `Controles.jsx` - Controles
- `App.jsx` - Principal

**Patrón de bucle sin letras sueltas:**
```javascript
const numParcelasActuales = state.parcelas.length;
for (let indice = 0; indice < numParcelasActuales; indice = indice + 1) {
  const parcela = state.parcelas[indice];
  // lógica
}
```

---

## 🎯 Patrones Comunes del Profesor

### 1. Estado inicial como constante
```javascript
const INITIAL_STATE = {
  // todas las variables
}
```

### 2. Reducer con if/else if
```javascript
function reducer(state, action) {
  let outputState = state;

  if (action.type == 'ACCION_1') {
    outputState = { ...state, campo: nuevoValor }
  }
  else if (action.type == 'ACCION_2') {
    // lógica
  }

  return outputState; // UN SOLO RETURN
}
```

### 3. Context Provider estructura
```javascript
export const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
```

### 4. useContext en componentes
```javascript
const { state, dispatch } = useContext(GameContext);
```

### 5. Timer principal
```javascript
useEffect(() => {
  let timer = setInterval(() => {
    dispatch({ type: 'TICK' })
  }, 1000);

  return () => clearInterval(timer)
}, []);
```

### 6. Comparaciones con ==
```javascript
if (state.valor == 0) { }
```

### 7. Variables descriptivas (NO letras sueltas)
```javascript
// ❌ MAL
for (let i = 0; i < n; i++) { }

// ✅ BIEN
const numParcelasActuales = state.parcelas.length;
for (let indice = 0; indice < numParcelasActuales; indice = indice + 1) { }
```

### 8. Math.round para precios
```javascript
precio: Math.round(state.precio * 1.2)
```

### 9. Bootstrap classes simples
```javascript
<div className='row justify-content-center'>
  <div className='col-md-4 col-12'>
    <button className='btn btn-primary'>
```

### 10. Disabled en botones
```javascript
disabled={!state.juegoIniciado || state.juegoPausado}
```

---

## 🔥 Checklist para la Prueba Técnica

### Antes de empezar:
- [ ] Leer el enunciado completo 2 veces
- [ ] Identificar: ¿necesito Context API?
- [ ] Identificar: ¿cuántos componentes separados?
- [ ] Escribir el INITIAL_STATE en papel

### Durante el desarrollo:
- [ ] Crear Context Provider primero
- [ ] Definir todas las acciones del reducer
- [ ] Probar cada acción antes de continuar
- [ ] Nombrar variables de forma descriptiva
- [ ] Un solo return por función
- [ ] No usar break ni continue
- [ ] Usar == en lugar de ===
- [ ] Math.round() para números mostrados

### Bootstrap:
- [ ] Importar: `import 'bootstrap/dist/css/bootstrap.min.css'`
- [ ] Usar: container, row, col-12, col-md-X
- [ ] Botones: btn btn-primary / btn-success / btn-danger

### Al finalizar:
- [ ] Probar todos los botones
- [ ] Probar pausar/reanudar si lo pide
- [ ] Verificar que los precios escalan correctamente
- [ ] Comprobar que no se puede comprar sin recursos

---

## 📝 Otros Ejercicios Probables

### 1. Quiz/Trivia Game
- Preguntas con opciones múltiples
- Sistema de puntuación
- Timer por pregunta
- Categorías de preguntas

### 2. Todo List Avanzado
- Filtros (todos, completados, pendientes)
- Categorías o prioridades
- Editar tareas
- Contador de tareas

### 3. Carrito de Compra
- Lista de productos
- Añadir/quitar del carrito
- Calcular total
- Descuentos o cupones
- Stock limitado

---

## 💡 Consejos Finales

1. **Simplicidad**: No sobre-ingeniar, hacer lo que pide el enunciado
2. **Nombres claros**: `numeroOleadaActual` mejor que `oleada` o `n`
3. **Probar frecuentemente**: Cada vez que añadas una acción, pruébala
4. **Comentarios**: Añade comentarios cortos donde la lógica no sea obvia
5. **Bootstrap básico**: No te compliques con CSS custom
6. **Un paso a la vez**: Context → Reducer → Componentes → Lógica
7. **No uses**: switch, break, continue, múltiples returns
8. **Usa**: if/else if, un return, variables descriptivas

---

## 🚀 Cómo Ejecutar los Ejercicios

```bash
cd nombreProyecto
npm install
npm install bootstrap
npm run dev
```

¡Buena suerte en la prueba técnica! 🍀
