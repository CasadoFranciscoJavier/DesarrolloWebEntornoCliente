# Unidad Didáctica 2

## 1. Configuración y Herramientas Modernas de Desarrollo para React

En React, las herramientas han avanzado mucho y ahora hay opciones como **Vite** y **ESLint** que facilitan el desarrollo, mejoran el rendimiento, y ayudan a mantener el código ordenado y sin errores. Aquí te explico cómo configurarlas para hacer tu trabajo en React más fácil y rápido.

### 1.1. Vite: La Nueva Forma de Desarrollar en React

#### ¿Qué es Vite?

**Vite** es una herramienta para crear aplicaciones web de manera rápida. Es mucho más veloz que herramientas tradicionales como **Create React App (CRA)** y ofrece una mejor experiencia en el desarrollo al hacer que las actualizaciones y la recarga de los cambios en la app sean casi instantáneos.

**Ventajas de Vite frente a Create React App (CRA):**

1. **Inicio rápido**: Vite arranca el proyecto al instante.
2. **Actualización de cambios (HMR)**: Vite hace cambios en tu app en vivo sin necesidad de recargarla.
3. **Optimización para producción**: Vite usa una herramienta llamada Rollup para optimizar la app cuando se lanza en producción.
4. **Configuración sencilla**: CRA tiene muchas configuraciones y dependencias adicionales, Vite es más ligero.

#### Cómo Iniciar un Proyecto con Vite

1. **Instalar Vite**: Abre la terminal y ejecuta:
   
   ```bash
   npm create vite@latest nombre-proyecto
   ```

   Este comando descarga todos los archivos necesarios.

2. **Seleccionar el framework**: Luego de ejecutar el comando, elige **React** y luego el lenguaje (JavaScript o TypeScript).

3. **Instalar dependencias**: Entra en el directorio del proyecto e instala lo necesario:

   ```bash
   cd nombre-proyecto
   npm install
   ```

4. **Iniciar el servidor**: Ejecuta el comando para ver la app en tu navegador:

   ```bash
   npm run dev
   ```

   La app estará disponible en `http://localhost:5173`.

#### Estructura de un Proyecto con Vite

La estructura básica incluye:

```
nombre-proyecto/
├── index.html           // Entrada de la app
├── package.json         // Dependencias y scripts
├── src/                 // Código principal de la app
│   ├── App.jsx          // Componente principal de React
│   ├── main.jsx         // Punto de entrada de React
├── vite.config.js       // Configuración de Vite
```

### 1.2. ESLint: Mantén el Código Ordenado y sin Errores

#### ¿Qué es ESLint?

**ESLint** es una herramienta que analiza tu código y detecta errores y patrones problemáticos. Es muy útil en React para asegurarse de que el código siga buenas prácticas y evitar errores comunes, como usar mal los hooks de React.

#### Ventajas de Usar ESLint

1. **Mejora la calidad del código**.
2. **Mantiene el estilo de código consistente**.
3. **Ayuda a evitar errores comunes**.
4. **Funciona en conjunto con editores** como Visual Studio Code para ver errores en tiempo real.

#### Cómo Configurar ESLint en un Proyecto React con Vite

1. **Instalar ESLint**:

   ```bash
   npm install eslint eslint-plugin-react --save-dev
   ```

2. **Configurar ESLint**: Ejecuta el siguiente comando para crear una configuración básica:

   ```bash
   npx eslint --init
   ```

   Responde a las preguntas, seleccionando opciones como:
   - Usar ESLint para "verificar sintaxis y estilo de código".
   - Seleccionar "JavaScript modules (import/export)".
   - Elegir **React** como framework.
   - Configuración en formato JSON o JavaScript, según prefieras.

3. **Integrar ESLint con Vite**: Puedes instalar un plugin para que ESLint funcione durante el desarrollo.

   ```bash
   npm install vite-plugin-eslint --save-dev
   ```

   En el archivo `vite.config.js`, agrega el plugin:

   ```javascript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import eslintPlugin from 'vite-plugin-eslint';

   export default defineConfig({
     plugins: [react(), eslintPlugin()]
   });
   ```

#### Ejemplo de Configuración Básica de `.eslintrc.json`

Este archivo `.eslintrc.json` contiene reglas que indican cómo debe ser el código:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off"
  }
}
```

#### Ejecutar ESLint

Para analizar tu código, usa:

```bash
npx eslint src/
```

Este comando revisa el código en la carpeta `src/` y muestra errores o advertencias basados en las reglas que hayas configurado.

--- 

## 2. Manejo de eventos en React

En cualquier aplicación web, el manejo de eventos es una parte fundamental para interactuar con los usuarios. Los eventos son acciones como clics, envíos de formularios, escritura en campos de texto, etc. En React, el manejo de eventos es similar al DOM nativo de JavaScript, pero con algunas diferencias clave. A continuación, veremos cómo React gestiona los eventos y cómo trabajar con formularios en aplicaciones React.

### 2.1. Manejo de eventos en JSX (`onClick`, `onChange`, etc.)

#### ¿Qué es un evento en React?

Un **evento** en React es un objeto que representa una acción que el usuario realiza en la interfaz de usuario. Estos eventos pueden ser de varios tipos, como un clic, un cambio en un campo de texto, un envío de formulario, etc. React utiliza una versión "sintética" de los eventos nativos de JavaScript, lo que significa que React crea su propia capa de abstracción sobre los eventos para que sean consistentes en todos los navegadores.

#### Diferencias entre eventos en React y eventos en JavaScript puro

1. **Sintaxis JSX**: En React, los eventos se escriben en camelCase (por ejemplo, `onClick` en lugar de `onclick`).
2. **Funciones en lugar de cadenas**: En lugar de pasar una cadena de texto que contiene código JavaScript (como en HTML), en React le pasas una **función** que será llamada cuando el evento ocurra.

#### Manejo básico de eventos

Los eventos en React se manejan asignando funciones de callback a los atributos de eventos en JSX. Aquí algunos de los eventos más comunes:

- **`onClick`**: Se dispara cuando el usuario hace clic en un elemento.
- **`onChange`**: Se dispara cuando el valor de un input cambia.
- **`onSubmit`**: Se dispara cuando se envía un formulario.
- **`onMouseEnter`**: Se dispara cuando el puntero del mouse entra en el área de un elemento.
- **`onMouseLeave`**: Se dispara cuando el puntero del mouse sale del área de un elemento.

#### Ejemplo de uso de `onClick`

Veamos un ejemplo básico donde un botón incrementa un contador cuando es clicado.

```jsx
import React, { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={handleClick}>Haz clic aquí</button>
    </div>
  );
}

export default Contador;
```

#### Explicación del ejemplo:

1. **`useState`**: Usamos el hook `useState` para mantener el estado del contador (`count`).
2. **`handleClick`**: Creamos una función que se ejecuta cada vez que el botón es clicado. En este caso, simplemente incrementa el estado del contador.
3. **`onClick`**: En el botón, asignamos la función `handleClick` al atributo `onClick`, lo que significa que se ejecutará cuando el botón sea clicado.

#### Eventos con parámetros

Si necesitas pasar parámetros a una función en un evento, puedes hacerlo creando una función anónima dentro del evento:

```jsx
<button onClick={() => handleClick('parámetro')}>Clic aquí</button>
```

Esto es útil cuando la función de evento necesita información adicional para ejecutarse correctamente.

#### Prevenir el comportamiento por defecto

En algunos casos, querrás evitar que el comportamiento predeterminado de un evento ocurra. Por ejemplo, al hacer clic en un enlace o enviar un formulario. En React, puedes hacerlo usando `event.preventDefault()`.

```jsx
function Enlace() {
  const handleClick = (e) => {
    e.preventDefault();
    alert('Enlace clicado, pero la navegación ha sido prevenida.');
  };

  return (
    <a href="https://www.google.com" onClick={handleClick}>
      Haz clic aquí
    </a>
  );
}
```

#### Eventos comunes en formularios

Al trabajar con formularios, se manejan principalmente dos tipos de eventos:
- **`onChange`**: Para detectar cuando el valor de un campo de formulario cambia.
- **`onSubmit`**: Para manejar el envío de un formulario.

Veamos un ejemplo básico con un campo de texto y el evento `onChange`.

```jsx
import React, { useState } from 'react';

function Formulario() {
  const [nombre, setNombre] = useState('');

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  return (
    <div>
      <input type="text" value={nombre} onChange={handleChange} />
      <p>Tu nombre es: {nombre}</p>
    </div>
  );
}

export default Formulario;
```

##### Explicación:

1. **`onChange`**: Cada vez que el valor del campo de texto cambia, `handleChange` se ejecuta, actualizando el estado `nombre`.
2. **`e.target.value`**: Es el valor actual del campo de entrada.

### 2.2. Formularios controlados y no controlados en React

React te permite manejar formularios de dos maneras principales: con **componentes controlados** y **componentes no controlados**. Ambos enfoques tienen sus pros y contras, y la elección entre uno u otro depende del caso de uso.

#### 2.2.1. Formularios controlados

En un **formulario controlado**, los valores de los inputs son manejados por el estado de React. Cada cambio en los campos del formulario se refleja en el estado del componente, lo que te permite tener un control total sobre los datos del formulario.

##### Ventajas de formularios controlados:

- Puedes validar y formatear los datos del formulario a medida que se ingresan.
- Tienes control total sobre lo que está sucediendo en cada input.
- El estado del formulario siempre está sincronizado con los valores de los campos.

##### Ejemplo de formulario controlado

```jsx
import React, { useState } from 'react';

function FormularioControlado() {
  const [form, setForm] = useState({
    nombre: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioControlado;
```

##### Explicación:

1. **`useState`**: El estado `form` contiene los valores del formulario (nombre y email).
2. **`onChange`**: Cada vez que un campo cambia, la función `handleChange` actualiza el estado del formulario.
3. **`onSubmit`**: Cuando el formulario se envía, evitamos el comportamiento predeterminado del navegador con `e.preventDefault()` y luego accedemos a los datos del formulario.

#### 2.2.2. Formularios no controlados

En un **formulario no controlado**, los valores de los inputs no son manejados directamente por el estado de React. En lugar de eso, usas una referencia (`useRef`) para acceder a los valores del DOM. Este enfoque se parece más a cómo manejarías formularios en JavaScript puro.

##### Ventajas de formularios no controlados:

- Son más sencillos de configurar si no necesitas validar o formatear los datos en tiempo real.
- Los formularios no controlados pueden ser más eficientes en casos donde no necesitas que cada cambio actualice el estado.

##### Ejemplo de formulario no controlado

```jsx
import React, { useRef } from 'react';

function FormularioNoControlado() {
  const nombreRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = nombreRef.current.value;
    const email = emailRef.current.value;
    console.log('Datos enviados:', { nombre, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" ref={nombreRef} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" ref={emailRef} />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioNoControlado;
```

##### Explicación:

1. **`useRef`**: Usamos `useRef` para crear referencias a los elementos del formulario.
2. **Acceso a valores**: Los valores de los campos no están en el estado de React, sino que los accedemos directamente desde el DOM utilizando `ref.current.value`.

### Diferencias entre formularios controlados y no controlados

- **Formularios controlados**: React gestiona los valores de los inputs, actualizando el estado con cada cambio.
- **Formularios no controlados**: Los valores no están en el estado, sino que se acceden directamente a través del DOM.

##### ¿Cuándo usar cada tipo?

- **Controlados**: Cuando necesitas validar, formatear o manejar los datos a medida que se ingresan (por ejemplo, en formularios complejos con validaciones en tiempo real).
- **No controlados**: Cuando solo necesitas los valores del formulario en un punto final (por ejemplo, cuando envías el formulario) y no necesitas manejar el estado en tiempo real.

---

## 3. Componentes reutilizables y manejo de listas

En aplicaciones web, especialmente aquellas desarrolladas con React, uno de los principios clave es la reutilización de código. Crear componentes que se puedan reutilizar en distintas partes de la aplicación no solo reduce la duplicación de código, sino que también mejora la mantenibilidad y escalabilidad de tu proyecto. Además, el manejo de listas es fundamental cuando trabajamos con datos dinámicos, como los que se obtienen de una API, y queremos mostrar esos datos en la interfaz.

### 3.1. Renderizado de listas con `.map`

#### ¿Qué es el renderizado de listas?

En muchas aplicaciones, necesitas mostrar una lista de datos, como una lista de nombres, productos o mensajes. En React, la forma más sencilla de mostrar una lista es usando el método `.map()` de JavaScript para crear un componente para cada ítem en esa lista.

#### ¿Cómo funciona `.map()`?

`.map()` es una función en JavaScript que recorre cada elemento en un array y devuelve un nuevo array con los resultados. En React, usamos `.map()` para transformar cada elemento del array en un componente JSX, que luego se muestra en la pantalla.

#### Ejemplo básico de renderizado de una lista con `.map()`

Supongamos que tienes una lista de nombres y quieres mostrar cada nombre como un ítem en una lista:

```jsx
import React from 'react';

function ListaNombres() {
  const nombres = ['Juan', 'Ana', 'Carlos', 'Marta'];

  return (
    <ul>
      {nombres.map((nombre, index) => (
        <li key={index}>{nombre}</li>
      ))}
    </ul>
  );
}

export default ListaNombres;
```

**Explicación del ejemplo:**

1. **Array de datos**: Creamos un array `nombres` con los nombres que queremos mostrar.
2. **Uso de `.map()`**: Usamos `.map()` para transformar cada nombre en un elemento `<li>`.
3. **Propiedad `key`**: En React, cada elemento de una lista necesita una `key` única. Aquí usamos `index` como la `key`, pero es mejor usar un identificador único (como un `id`) si está disponible.

#### ¿Por qué es importante la `key` en el renderizado de listas?

La `key` permite a React identificar cada elemento de la lista y realizar cambios solo donde sea necesario. Esto mejora el rendimiento y evita problemas visuales cuando la lista cambia (se añaden, eliminan o cambian elementos).

#### Ejemplo con objetos y una `key` única

Imagina ahora que tienes una lista de objetos, donde cada objeto representa a una persona con un `id` y un `nombre`. Vamos a renderizar esta lista de forma similar:

```jsx
import React from 'react';

function ListaPersonas() {
  const personas = [
    { id: 1, nombre: 'Juan' },
    { id: 2, nombre: 'Ana' },
    { id: 3, nombre: 'Carlos' },
    { id: 4, nombre: 'Marta' }
  ];

  return (
    <ul>
      {personas.map(persona => (
        <li key={persona.id}>{persona.nombre}</li>
      ))}
    </ul>
  );
}

export default ListaPersonas;
```

**Explicación del ejemplo:**

1. **Array de objetos**: Tenemos un array `personas`, y cada objeto tiene un `id` único y un `nombre`.
2. **`key` única**: Usamos el `id` de cada persona como `key`, que es una buena práctica porque cada elemento de la lista tendrá una `key` única y estable.

---

## 4. Manejo avanzado de estado en React

Cuando comenzamos a trabajar con React, la forma más sencilla de manejar el estado de un componente es usando el hook `useState`. Sin embargo, en aplicaciones más grandes o con estados más complejos, `useState` puede volverse difícil de manejar. Es aquí donde entran técnicas más avanzadas como `useReducer` y el Context API, que permiten un mejor control y organización de los estados, especialmente cuando los estados son anidados o cuando se necesita compartir estado entre múltiples componentes.

### 4.1. `useReducer`: Para manejar estados complejos en React

#### ¿Qué es `useReducer`?

`useReducer` es una herramienta de React que te ayuda a manejar estados que tienen varias partes o que cambian de forma más complicada. Es como `useState`, pero más útil cuando tienes muchos datos que controlar o reglas específicas para cambiar el estado.

En lugar de cambiar el estado directamente, `useReducer` usa un método especial llamado **reductor**. Un reductor es solo una función que recibe dos cosas: el estado actual y una "acción" que quieres hacer. Luego, devuelve el nuevo estado según esa acción.

#### Cómo se usa `useReducer`

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- **`reducer`**: La función que dice cómo cambia el estado.
- **`initialState`**: El estado inicial.
- **`state`**: El estado actual.
- **`dispatch`**: La función para ejecutar acciones y cambiar el estado.

#### ¿Cómo funciona `useReducer`?

1. **Estado inicial**: Defines el estado de inicio.
2. **Reductor**: Defines una función que decide cómo cambia el estado en respuesta a una acción.
3. **Acciones**: Para cambiar el estado, usas `dispatch` con una acción (un objeto que tiene un `type`, indicando el tipo de cambio).

#### Ejemplo simple de `useReducer`

Imagina un contador que puede subir, bajar y reiniciarse. Así lo haríamos con `useReducer`:

```jsx
import { useReducer } from 'react';

// Función reductora
function contadorReducer(state, action) {
  switch (action.type) {
    case 'incrementar':
      return { count: state.count + 1 };
    case 'decrementar':
      return { count: state.count - 1 };
    case 'reiniciar':
      return { count: 0 };
    default:
      return state;
  }
}

function Contador() {
  const initialState = { count: 0 };

  const [state, dispatch] = useReducer(contadorReducer, initialState);

  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: 'incrementar' })}>Incrementar</button>
      <button onClick={() => dispatch({ type: 'decrementar' })}>Decrementar</button>
      <button onClick={() => dispatch({ type: 'reiniciar' })}>Reiniciar</button>
    </div>
  );
}

export default Contador;
```

##### Explicación del ejemplo:

1. **Función `contadorReducer`**: Define cómo cambia el contador con cada acción (`incrementar`, `decrementar`, `reiniciar`).
2. **Estado inicial**: Empieza en `{ count: 0 }`.
3. **`dispatch`**: Usas esta función para enviar una acción que cambia el contador.
4. **Interfaz**: Cada vez que presionas un botón, el contador se actualiza en la pantalla.

#### ¿Cuándo usar `useReducer`?

- Cuando tienes un **estado complicado** con varios datos.
- Cuando los cambios en el estado deben seguir ciertas reglas.
- Cuando el nuevo estado depende del estado anterior.
- Cuando necesitas lógica para decidir cómo cambiar el estado.

#### `useReducer` vs `useState`

- Usa `useState` para estados simples, como un solo valor.
- Usa `useReducer` para estados complejos o cuando necesitas diferentes maneras de cambiar el estado.

---

## 5. ¿Qué es el Context API?

El **Context API** en React es una herramienta para **compartir datos** (como el estado o funciones) entre varios componentes de una app sin tener que pasarlos manualmente a través de cada nivel. Esto evita el proceso complicado llamado "prop drilling", que es pasar datos de un componente a otro por muchos niveles, lo cual se vuelve engorroso en apps grandes.

Básicamente, el Context API te permite crear un **espacio de almacenamiento central** para que varios componentes puedan acceder a la misma información.

### ¿Cómo funciona el Context API?

El Context API tiene tres partes principales:

1. **Contexto (`React.createContext()`)**: Es un "espacio" donde puedes guardar datos y compartirlos entre componentes.
2. **Proveedor (`Provider`)**: Es un componente que "envuelve" a otros componentes y les da acceso a los datos almacenados en el contexto.
3. **Consumidor (`useContext()`)**: Es una función que los componentes usan para obtener los datos del contexto.

### Ejemplo básico del Context API

Imagina que tienes una app donde puedes cambiar entre un tema claro y oscuro, y necesitas que esta información esté disponible en varios componentes.

1. **Crear el contexto**: 

   ```jsx
   import React, { createContext, useState } from 'react';

   // Creamos el contexto
   export const TemaContext = createContext();

   export function TemaProvider({ children }) {
     const [tema, setTema] = useState('claro');

     const cambiarTema = () => {
       setTema(tema === 'claro' ? 'oscuro' : 'claro');
     };

     return (
       <TemaContext.Provider value={{ tema, cambiarTema }}>
         {children}
       </TemaContext.Provider>
     );
   }
   ```

   - Aquí, creamos un contexto llamado `TemaContext` y un componente llamado `TemaProvider`. Este último tiene una variable `tema` (tema claro o oscuro) y una función para cambiar el tema.

2. **Usar el contexto en un componente hijo**:

   ```jsx
   import React, { useContext } from 'react';
   import { TemaContext } from './TemaProvider';

   function BotonTema() {
     const { tema, cambiarTema } = useContext(TemaContext);

     return (
       <div style={{ background: tema === 'oscuro' ? '#333' : '#fff', color: tema === 'oscuro' ? '#fff' : '#000' }}>
         <p>El tema actual es: {tema}</p>
         <button onClick={cambiarTema}>Cambiar Tema</button>
       </div>
     );
   }

   export default BotonTema;
   ```

   - En este componente, usamos `useContext` para obtener el valor actual del tema y la función `cambiarTema` del contexto. Aquí cambiamos el estilo de fondo y el texto dependiendo del tema actual.

3. **Usar el proveedor en el árbol de componentes**:

   ```jsx
   import React from 'react';
   import { TemaProvider } from './TemaProvider';
   import BotonTema from './BotonTema';

   function App() {
     return (
       <TemaProvider>
         <div>
           <h1>Ejemplo de Context API</h1>
           <BotonTema />
         </div>
       </TemaProvider>
     );
   }

   export default App;
   ```

   - Aquí, `TemaProvider` envuelve los componentes que necesitan acceder al tema. En este caso, `BotonTema` puede leer y cambiar el tema sin necesidad de pasar nada manualmente.

#### Resumen del ejemplo:

1. **Crear el contexto**: Hacemos un espacio de almacenamiento compartido (`createContext`).
2. **Proveer el contexto**: `TemaProvider` envuelve los componentes que necesitan acceder al tema.
3. **Usar el contexto**: `useContext` permite que el componente `BotonTema` acceda al tema y a la función `cambiarTema`.

### ¿Cuándo usar el Context API?

Usa el Context API cuando:

- Necesites **compartir datos** o funciones entre varios componentes.
- Pasar propiedades a través de muchos niveles de componentes sea **tedioso**.
- Manejes **temas, autenticación**, o cualquier información que deba estar disponible en toda la app.

### Mejorar el Context API con `useReducer`

A veces, se usa `useReducer` junto con el Context API para manejar el estado global de forma más clara y organizada.

```jsx
import React, { createContext, useReducer, useContext } from 'react';

const EstadoGlobalContext = createContext();

const estadoInicial = { contador: 0 };

function reductorGlobal(state, action) {
  switch (action.type) {
    case 'incrementar':
      return { ...state, contador: state.contador + 1 };
    case 'decrementar':
      return { ...state, contador: state.contador - 1 };
    default:
      return state;
  }
}

export function EstadoGlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reductorGlobal, estadoInicial);

  return (
    <EstadoGlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </EstadoGlobalContext.Provider>
  );
}

export function useEstadoGlobal() {
  return useContext(EstadoGlobalContext);
}
```

- `EstadoGlobalProvider` crea un estado global usando `useReducer`, donde puedes manejar acciones (como incrementar y decrementar).
- `useEstadoGlobal` permite a los componentes acceder a este estado y realizar cambios.