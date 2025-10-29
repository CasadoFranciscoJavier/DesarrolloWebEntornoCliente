# **Unidad Didáctica 1: Introducción a React**

---

## **1. Introducción a JavaScript moderno**

En este apartado, aprenderemos algunos de los conceptos clave de **JavaScript moderno (ES6+)** que se utilizan intensivamente en React. Estas características hacen que el código sea más limpio, eficiente y fácil de mantener. Aunque React es una biblioteca propia, su sinergia con las nuevas funcionalidades de JavaScript la hace más poderosa y flexible.

#### **Conceptos principales de ES6+**

Al trabajar con React, es fundamental entender algunas de las características introducidas en ES6 y versiones posteriores, ya que estas se utilizan comúnmente en la escritura de componentes y manejo de datos en aplicaciones. Los temas más importantes que abordaremos aquí son la **destructuración de objetos y arrays**, las **funciones flecha**, y el uso de **módulos**.

---

### 1.1. **Destructuración de objetos y arrays**

La destructuración es una característica de ES6 que permite extraer valores de objetos o arrays y asignarlos a variables de manera más concisa. Es especialmente útil en React, donde las propiedades (props) y el estado (state) suelen ser objetos con múltiples propiedades.

#### **Destructuración de objetos**

La destructuración de objetos permite obtener directamente los valores de las propiedades de un objeto y asignarlos a variables sin tener que acceder a cada propiedad individualmente.

```javascript
// Ejemplo de destructuración de un objeto
const persona = {
  nombre: "Juan",
  edad: 25,
  ciudad: "Madrid"
};

// Sin destructuración
console.log(persona.nombre); // "Juan"
console.log(persona.edad); // 25

// Con destructuración
const { nombre, edad } = persona;
console.log(nombre); // "Juan"
console.log(edad); // 25
```

En este ejemplo, estamos creando un objeto llamado `persona` con varias propiedades (nombre, edad, ciudad). Usamos la sintaxis de destructuración `const { nombre, edad } = persona;` para extraer las propiedades `nombre` y `edad` en variables separadas. Esto simplifica el acceso a las propiedades sin tener que escribir repetidamente `persona.nombre` o `persona.edad`.

#### **Destructuración de arrays**

La destructuración de arrays permite extraer elementos de un array de manera similar a los objetos. Aquí, los valores se asignan en función de su posición en el array.

```javascript
// Ejemplo de destructuración de un array
const numeros = [1, 2, 3, 4];

// Sin destructuración
const primero = numeros[0];
const segundo = numeros[1];

console.log(primero); // 1
console.log(segundo); // 2

// Con destructuración
const [primero, segundo] = numeros;
console.log(primero); // 1
console.log(segundo); // 2
```

En este caso, la destructuración asigna los primeros dos elementos del array `numeros` a las variables `primero` y `segundo`. Es útil cuando queremos trabajar directamente con elementos de un array sin tener que referirnos a los índices de manera explícita.

También se puede hacer destructuración en elementos específicos de un array que no necesariamente estén al principio del mismo, incluso si no se quiere acceder a todos los elementos. Para saltarse un valor en una posición específica, se puede utilizar una coma sin asignar nada a una variable. Por ejemplo, si se quiere acceder a las posiciones 1 y 3 (es decir, los elementos 2 y 4 del array), se puede hacer de la siguiente manera:

```javascript
// Ejemplo de destructuración de un array con elementos específicos
const numeros = [1, 2, 3, 4];

// Destructuración para acceder a las posiciones 1 y 3
const [, segundo, , cuarto] = numeros;

console.log(segundo); // 2
console.log(cuarto);  // 4
```

Este enfoque es útil cuando solo interesan algunos elementos del array, y permite saltar posiciones de manera limpia y legible.

#### **Aplicación en React**

La destructuración es particularmente útil cuando trabajamos con **props** y **state** en React. Por ejemplo, en lugar de escribir `props.nombre`, podemos usar destructuración para acceder directamente a `nombre` y otras propiedades:

```javascript
function Usuario({ nombre, edad }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <p>Edad: {edad}</p>
    </div>
  );
}
```

En este ejemplo, estamos usando destructuración directamente en los parámetros del componente funcional `Usuario`, lo que hace el código más limpio y legible.

---

### 1.2. **Funciones flecha**

Las funciones flecha son una forma más concisa de escribir funciones en JavaScript. Se introdujeron en ES6 y, además de simplificar la sintaxis, manejan el valor de `this` de una manera más predecible que las funciones tradicionales. En React, las funciones flecha son comunes, especialmente al trabajar con eventos y callbacks.

#### **Función tradicional**

```javascript
function sumar(a, b) {
  return a + b;
}

console.log(sumar(2, 3)); // 5
```

En una función tradicional como la anterior, debemos declarar explícitamente el cuerpo de la función y el valor de retorno.

#### **Función flecha**

```javascript
const sumarFlecha = (a, b) => a + b;

console.log(sumarFlecha(2, 3)); // 5
```

Con las funciones flecha, podemos simplificar la sintaxis. Si la función tiene un cuerpo que solo contiene una expresión (como una operación matemática), podemos omitir la palabra clave `return` y las llaves `{}`. Esto hace que el código sea más compacto.

#### **Diferencia en el manejo de `this`**

Una diferencia clave entre las funciones flecha y las tradicionales es cómo manejan el valor de `this`. Las funciones flecha **no crean su propio contexto de `this`**. En su lugar, utilizan el valor de `this` del contexto donde fueron definidas. Esto es útil en React, donde queremos que los métodos de una clase utilicen el valor de `this` correspondiente al componente.

**Ejemplo con `this` en una función tradicional:**

```javascript
function Persona() {
  this.nombre = "Juan";
  
  setTimeout(function() {
    console.log(this.nombre); // Undefined, ya que `this` dentro de esta función apunta al contexto global.
  }, 1000);
}
```

**Ejemplo con `this` en una función flecha:**

```javascript
function Persona() {
  this.nombre = "Juan";
  
  setTimeout(() => {
    console.log(this.nombre); // "Juan", ya que la función flecha usa el valor de `this` del entorno de `Persona`.
  }, 1000);
}
```

En React, las funciones flecha se usan frecuentemente como callbacks para eventos o métodos de componentes. Esto ayuda a evitar problemas con el valor de `this` cuando, por ejemplo, estamos trabajando con eventos de clic en botones.

---

### 1.3. **Módulos en JavaScript**

Los **módulos** permiten dividir el código en archivos más pequeños y reutilizables, lo que facilita la organización y el mantenimiento de aplicaciones grandes. Con la llegada de ES6, JavaScript introdujo el soporte nativo para módulos, lo que permite importar y exportar código de otros archivos de manera sencilla.

#### **Exportación de módulos**

Podemos exportar variables, funciones o clases desde un archivo para que puedan ser utilizadas en otros archivos.

```javascript
// archivo: operaciones.js
export function sumar(a, b) {
  return a + b;
}

export const PI = 3.1416;
```

En este ejemplo, estamos exportando la función `sumar` y la constante `PI` desde un archivo llamado `operaciones.js`.

#### **Importación de módulos**

Una vez que hemos exportado funciones o variables, podemos importarlas en otros archivos:

```javascript
// archivo: main.js
import { sumar, PI } from './operaciones';

console.log(sumar(3, 4)); // 7
console.log(PI); // 3.1416
```

Con `import` podemos traer las funciones o variables que hemos exportado previamente. Esto es útil en React, ya que podemos organizar nuestros componentes, utilidades y otros módulos en archivos separados.

#### **Exportación por defecto**

Un módulo también puede tener una **exportación por defecto**, lo que permite exportar un valor por defecto que puede ser importado sin llaves `{}`.

```javascript
// archivo: operaciones.js
export default function restar(a, b) {
  return a - b;
}
```

Para importar la función exportada por defecto:

```javascript
// archivo: main.js
import restar from './operaciones';

console.log(restar(10, 3)); // 7
```

---

## **2. Conceptos básicos de React**

### 2.1. **¿Qué es React?**

React es una biblioteca de JavaScript desarrollada por Facebook que se utiliza para construir interfaces de usuario interactivas basadas en componentes. React utiliza un enfoque declarativo para crear interfaces, lo que significa que describimos **cómo** debería verse la interfaz en cada estado, y React se encarga de actualizarla de forma eficiente.

### **2.2. Instalación del entorno de desarrollo**

El primer paso para empezar a desarrollar una aplicación en **React** es configurar correctamente el entorno de desarrollo. React ofrece varias herramientas para comenzar un nuevo proyecto, siendo una de las más populares **Create React App**. Esta herramienta oficial, proporcionada por el equipo de React, te permite crear un proyecto React completamente configurado sin tener que preocuparte por configuraciones manuales de Webpack, Babel o cualquier otro proceso de build que normalmente se requiere en un entorno de desarrollo moderno.

#### **¿Qué es Create React App?**

**Create React App (CRA)** es un generador de plantillas que configura automáticamente una estructura de proyecto React optimizada, junto con las dependencias necesarias para empezar a trabajar de inmediato. Al usar CRA, obtendrás una estructura de carpetas estandarizada, scripts útiles para el desarrollo y la producción, y configuraciones predeterminadas que te ayudarán a centrarte exclusivamente en el código de tu aplicación sin preocuparte por la configuración de herramientas subyacentes.

- **Ventajas de Create React App**:
  1. **Configuración automatizada**: CRA ya viene con configuraciones predefinidas de Webpack y Babel, herramientas esenciales para la transpilación de código moderno y el empaquetado de archivos.
  2. **Modo de desarrollo con hot-reloading**: Al iniciar el proyecto, CRA crea un servidor de desarrollo que actualiza automáticamente la aplicación cada vez que haces un cambio en el código (hot-reloading), permitiéndote ver los resultados en tiempo real sin necesidad de recargar la página.
  3. **Preparado para producción**: CRA incluye scripts para compilar y optimizar tu aplicación para el entorno de producción, minimizando y optimizando el código final para un rendimiento eficiente.

#### **Instalación de Create React App**

Para instalar y comenzar a utilizar **Create React App**, debes tener **Node.js** y **npm** instalados en tu sistema. **Node.js** proporciona el entorno de ejecución necesario para ejecutar React en el lado del servidor y manejar dependencias mediante **npm** (Node Package Manager), la herramienta que usamos para instalar bibliotecas y paquetes.

Sigue los pasos detallados a continuación para crear y configurar tu primer proyecto de React.

##### **Paso 1: Crear un nuevo proyecto con Create React App**

El primer comando que ejecutamos es `npx create-react-app nombre-del-proyecto`. Este comando descarga y ejecuta la última versión de Create React App sin necesidad de instalarlo globalmente, y genera automáticamente la estructura del proyecto con todas las dependencias necesarias.

```bash
npx create-react-app nombre-del-proyecto
```

- **npx**: es una herramienta que viene con npm 5.2 o superior. Permite ejecutar comandos de paquetes de npm sin tener que instalarlos globalmente.
- **create-react-app**: es el nombre del generador que se ejecuta con npx.
- **nombre-del-proyecto**: es el nombre que deseas darle a tu proyecto. Este nombre creará una carpeta con la estructura del proyecto en la ubicación donde ejecutas el comando.

Una vez que ejecutas el comando, Create React App hará lo siguiente:
- Creará la estructura básica del proyecto en una carpeta con el nombre que le diste.
- Instalará todas las dependencias necesarias, incluidas React, React-DOM (para manipular el DOM del navegador), Webpack (para empaquetar el código), Babel (para transpirar el código de ES6+ a ES5), entre otros.
- Configurará automáticamente scripts para iniciar el servidor de desarrollo, compilar el código para producción y ejecutar pruebas unitarias.

##### **Paso 2: Navegar al directorio del proyecto**

Después de que Create React App haya terminado de crear tu proyecto, el siguiente paso es **moverse** al directorio del proyecto recién creado utilizando el comando `cd`.

```bash
cd nombre-del-proyecto
```

Este comando cambia tu directorio actual a la carpeta que contiene los archivos y dependencias de tu nuevo proyecto React.

##### **Paso 3: Iniciar el servidor de desarrollo**

Para comenzar a desarrollar y ver tu aplicación en el navegador, ejecuta el comando `npm start`. Este comando lanzará el servidor de desarrollo local y abrirá la aplicación automáticamente en tu navegador predeterminado.

```bash
npm start
```

- **npm start**: este comando ejecuta un servidor de desarrollo que está preconfigurado por Create React App. El servidor es accesible en el navegador a través de `http://localhost:3000/` por defecto.
- El **servidor de desarrollo** tiene la capacidad de recargar automáticamente la página cada vez que realizas cambios en tu código. Esto se conoce como **hot-reloading**.

##### **Resultado:**

Al ejecutar `npm start`, verás que tu navegador se abre automáticamente y muestra una página de bienvenida predeterminada de React. Este es un punto de partida básico, con la estructura mínima que necesitas para comenzar a desarrollar tu aplicación.

La página de bienvenida de React tiene el siguiente aspecto:

- Un encabezado que muestra el logotipo de React.
- Un texto que te anima a editar el archivo `src/App.js` para modificar el contenido de la página.
- La página también muestra un enlace a la documentación oficial de React.

#### **Estructura del proyecto generado**

Create React App crea una estructura de carpetas organizada y modular, lo que facilita el desarrollo y mantenimiento de tu aplicación. A continuación, se muestra un desglose de las carpetas y archivos más importantes generados:

```plaintext
nombre-del-proyecto/
├── node_modules/          # Aquí se almacenan todas las dependencias del proyecto.
├── public/                # Contiene el archivo HTML principal y otros activos públicos.
│   ├── index.html         # Archivo HTML que se carga inicialmente en el navegador.
│   └── favicon.ico        # Icono que aparece en la pestaña del navegador.
├── src/                   # Aquí se encuentra el código fuente de tu aplicación React.
│   ├── App.js             # Componente principal de la aplicación.
│   ├── App.css            # Estilos asociados al componente App.
│   ├── index.js           # Punto de entrada principal de la aplicación.
│   └── index.css          # Estilos globales de la aplicación.
├── .gitignore             # Lista de archivos que Git debe ignorar.
├── package.json           # Archivo que contiene la información del proyecto y dependencias.
├── README.md              # Documentación básica del proyecto.
└── package-lock.json      # Archivo que asegura que se utilicen las mismas versiones de dependencias.
```

1. **`src/`**: Es la carpeta más importante, ya que contiene el código fuente de tu aplicación. Aquí es donde desarrollarás la mayor parte de tu proyecto React. 
   - **`App.js`**: Este es el componente principal de la aplicación. Puedes empezar a modificarlo inmediatamente para cambiar lo que ves en el navegador.
   - **`index.js`**: Este es el punto de entrada principal de la aplicación. Aquí es donde React se conecta al DOM del navegador utilizando ReactDOM para renderizar tu aplicación.

2. **`public/`**: Esta carpeta contiene activos estáticos, como imágenes y el archivo `index.html` principal. React inserta dinámicamente tu aplicación en el archivo `index.html`.

3. **`node_modules/`**: Contiene todas las dependencias instaladas del proyecto. No necesitas modificar esta carpeta, ya que se administra automáticamente por npm.

4. **`package.json`**: Contiene la información del proyecto y la lista de dependencias que utiliza tu aplicación. Además, define los scripts que puedes ejecutar, como `npm start` para iniciar el servidor de desarrollo.

### 2.3. **JSX: Sintaxis y uso**

**JSX** (JavaScript XML) es una extensión de JavaScript que permite escribir código que se parece mucho a HTML directamente dentro de nuestros archivos de JavaScript. Esto es clave para React, ya que simplifica mucho la creación de interfaces de usuario. Aunque JSX se asemeja al HTML, en realidad es un lenguaje basado en XML que se convierte en código JavaScript puro durante la fase de compilación. 

JSX permite a los desarrolladores describir de manera declarativa cómo debería verse la interfaz, lo que hace que el código sea más legible y fácil de entender al mezclar lógica y estructura en el mismo archivo.

#### ¿Cómo funciona JSX?

Cuando escribimos código JSX, como un simple elemento `<div>`, React lo convierte internamente en llamadas a `React.createElement()`, que es lo que genera los nodos del DOM virtual que utiliza React para hacer sus actualizaciones. Por lo tanto, aunque parece que estamos escribiendo HTML, en realidad estamos definiendo componentes y elementos de React.

#### Ejemplo básico de un componente con JSX

```javascript
import React from 'react';

function Saludo() {
  return (
    <div>
      <h1>¡Hola, mundo!</h1>
      <p>Este es mi primer componente en React.</p>
    </div>
  );
}

export default Saludo;
```

Vamos a desglosar este ejemplo:

1. **Importar React**: Aunque con versiones recientes de React (17 y superiores) ya no es necesario importar `React` directamente para usar JSX, es una buena práctica en proyectos más antiguos. Sin embargo, en muchos entornos de desarrollo moderno, el código JSX se transformará automáticamente sin necesidad de esta importación explícita.

2. **Definición del componente `Saludo`**: 
   - Estamos definiendo una función llamada `Saludo`, que es un **componente funcional**. Un componente funcional en React es simplemente una función de JavaScript que devuelve lo que se conoce como JSX.
   - Dentro de esta función, estamos retornando un bloque de JSX que describe cómo debe mostrarse el componente en la interfaz. En este caso, tenemos un elemento `<div>` que contiene un encabezado `<h1>` y un párrafo `<p>`.

3. **JSX y HTML**: Aunque parece que estamos escribiendo HTML dentro de JavaScript, en realidad es JSX. Algunas diferencias importantes entre JSX y HTML incluyen:
   - En JSX, en lugar de usar `class`, usamos `className` para definir clases CSS, ya que `class` es una palabra reservada en JavaScript.
   - Los elementos de JSX **deben estar siempre envueltos en un único contenedor** (por ejemplo, un `div`, `section` o cualquier otro contenedor), porque cada componente en React debe devolver un único elemento raíz.

4. **Exportación del componente**: Al final, exportamos el componente con `export default Saludo;`. Esto nos permite usar este componente en otros archivos, como en el archivo `App.js` o cualquier otro componente que lo importe.

#### ¿Por qué es importante JSX?

JSX nos permite escribir componentes de una forma más intuitiva y cercana al HTML que ya conocemos. Además, nos permite integrar JavaScript directamente en el código JSX. Esto significa que podemos utilizar expresiones de JavaScript dentro del JSX utilizando llaves `{}`. Por ejemplo:

```javascript
function SaludoPersonalizado({ nombre }) {
  return (
    <div>
      <h1>¡Hola, {nombre}!</h1>
    </div>
  );
}
```

En este ejemplo, estamos insertando el valor de `nombre` directamente dentro del JSX usando las llaves `{}`. Cualquier expresión de JavaScript válida puede ser colocada entre estas llaves.

#### Regla del único elemento raíz

Una regla importante en JSX es que **cada componente debe devolver un único elemento contenedor**. Esto significa que todo lo que se devuelve en un componente debe estar envuelto en un único elemento HTML o componente React. Si intentamos devolver varios elementos sin un contenedor, obtendremos un error. Por ejemplo, este código es inválido:

```javascript
function ComponenteInvalido() {
  return (
    <h1>Título</h1>
    <p>Esto generará un error</p>
  );
}
```

Para corregirlo, debemos envolver los elementos en un contenedor, como un `div` o un `React.Fragment`:

```javascript
function ComponenteValido() {
  return (
    <div>
      <h1>Título</h1>
      <p>Este código es válido</p>
    </div>
  );
}
```

Alternativamente, si no queremos añadir un contenedor extra al DOM, podemos usar `React.Fragment` o simplemente la sintaxis corta de fragmentos `<> </>`:

```javascript
function ComponenteConFragmento() {
  return (
    <>
      <h1>Título</h1>
      <p>Esto es válido usando un fragmento</p>
    </>
  );
}
```

#### 2.4. **Componentes funcionales y Props**

Un componente funcional es una función de JavaScript que retorna JSX. Los componentes pueden recibir **props** (abreviatura de "properties") para recibir datos dinámicos.

**Ejemplo de uso de props**:

```javascript
function Usuario({ nombre, edad }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <p>Edad: {edad}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Usuario nombre="Juan" edad={25} />
      <Usuario nombre="María" edad={30} />
    </div>
  );
}

export default App;
```

En este ejemplo, `Usuario` es un componente que recibe las props `nombre` y `edad`. Estas props permiten reutilizar el componente con diferentes datos.

---

### **3. Estado y ciclo de vida**

El manejo del estado y el ciclo de vida de los componentes son elementos esenciales para crear aplicaciones dinámicas en React. Los **hooks**, introducidos en las versiones más recientes de React, permiten a los componentes funcionales gestionar el estado y los efectos secundarios, que anteriormente solo estaban disponibles en componentes de clase. En este apartado, nos centraremos en dos de los hooks más importantes: `useState` y `useEffect`.

---

### 3.1. **useState: Gestión del estado en React**

El hook `useState` es una de las herramientas más fundamentales en React. Nos permite añadir y gestionar el **estado local** dentro de componentes funcionales. En versiones anteriores, solo los componentes de clase podían manejar el estado, pero con `useState`, podemos controlar datos y su comportamiento directamente en componentes funcionales de manera sencilla y efectiva.

##### ¿Qué es el estado?

El **estado** es una estructura de datos que contiene información que puede cambiar con el tiempo. Cuando cambia el estado de un componente, React vuelve a renderizar dicho componente para reflejar los cambios en la interfaz de usuario. En este sentido, el estado le da a las aplicaciones interactividad, permitiendo que los componentes respondan a eventos o actualizaciones de datos.

##### Cómo funciona `useState`

`useState` es un hook que retorna un array con dos elementos:
1. **El valor actual del estado** (que puede ser de cualquier tipo: número, string, objeto, array, etc.).
2. **Una función para actualizar ese valor**. Esta función es la única forma de modificar el estado.

Cada vez que se llama a esta función, React vuelve a renderizar el componente con el nuevo valor del estado.

##### Ejemplo básico de uso de `useState`

```javascript
import React, { useState } from 'react';

function Contador() {
  // Declaramos una variable de estado "contador" y la función para actualizarla "setContador"
  const [contador, setContador] = useState(0); // Estado inicial es 0

  // Función para incrementar el valor del contador
  const incrementar = () => {
    setContador(contador + 1); // Actualiza el estado sumando 1
  };

  return (
    <div>
      <p>Has hecho clic {contador} veces.</p> 
      <button onClick={incrementar}>Incrementar</button> {/* Evento onClick que dispara la función incrementar */}
    </div>
  );
}

export default Contador;
```

##### Explicación detallada del ejemplo:

1. **Declaración del estado**: 
   - Usamos `const [contador, setContador] = useState(0)` para crear una variable de estado `contador` y su correspondiente función `setContador`. 
   - El valor inicial del estado es `0`, lo que significa que `contador` empezará con este valor.
   
2. **Actualización del estado**:
   - La función `incrementar` usa `setContador` para incrementar el valor del contador en 1 cada vez que se hace clic en el botón. 
   - Cada vez que `setContador` se ejecuta, React actualiza el componente y vuelve a renderizarlo con el nuevo valor de `contador`.

3. **Renderizado**:
   - El componente muestra el valor actual de `contador` dentro de un párrafo (`<p>`), y cuando el usuario hace clic en el botón, el valor se actualiza.

Este patrón de estado y actualización es clave en React. `useState` nos permite almacenar cualquier tipo de valor en el estado, ya sea un número, un string, un array o incluso un objeto complejo.

---

#### 3.2. **useEffect: Efectos secundarios y ciclo de vida de los componentes**

Mientras que `useState` nos permite gestionar el estado, **`useEffect`** es el hook que utilizamos para manejar **efectos secundarios** en los componentes. Un efecto secundario es cualquier cosa que ocurra fuera del ciclo de renderizado "puro" de React, como la carga de datos desde una API, la manipulación del DOM directamente, la suscripción a eventos o el establecimiento de temporizadores.

##### ¿Qué es un efecto secundario?

Un efecto secundario es una operación que se realiza como respuesta a un cambio en el estado o en las props, pero que no forma parte directa del renderizado de la interfaz de usuario. Por ejemplo:
- Peticiones HTTP a APIs para obtener datos.
- Configuración de temporizadores o intervalos (`setTimeout`, `setInterval`).
- Suscripciones a eventos globales como el **scroll** o **eventos del teclado**.
  
##### Cómo funciona `useEffect`

El hook `useEffect` toma como argumento una función que se ejecuta después de que el componente ha sido renderizado. Esta función puede devolver otra función de "limpieza" que se ejecuta cuando el componente se desmonta o antes de que se vuelva a ejecutar el efecto.

**Sintaxis básica de `useEffect`**:

```javascript
useEffect(() => {
  // Código del efecto (ejemplo: llamada a una API)
  
  return () => {
    // Código de limpieza (opcional, ejemplo: limpiar un intervalo)
  };
}, [dependencias]); // Array de dependencias (opcional)
```

##### Ejemplo básico de uso de `useEffect`

```javascript
import React, { useState, useEffect } from 'react';

function Temporizador() {
  const [segundos, setSegundos] = useState(0); // Estado para llevar el conteo de segundos

  useEffect(() => {
    // Configuramos un intervalo que incrementa el contador cada segundo
    const intervalo = setInterval(() => {
      setSegundos(s => s + 1);
    }, 1000);

    // Función de limpieza para cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez cuando el componente se monte

  return <p>Han pasado {segundos} segundos desde que abriste esta página.</p>;
}

export default Temporizador;
```

##### Explicación detallada del ejemplo:

1. **Estado inicial**:
   - Usamos `const [segundos, setSegundos] = useState(0)` para crear una variable de estado `segundos` con un valor inicial de 0.

2. **Configuración del efecto con `useEffect`**:
   - Dentro de `useEffect`, establecemos un intervalo usando `setInterval` para que, cada segundo, se incremente el valor de `segundos`.
   - La función `setSegundos` se llama dentro del intervalo para actualizar el estado cada segundo.
   - La función `useEffect` se ejecuta después de que el componente se haya renderizado por primera vez.

3. **Función de limpieza**:
   - Retornamos una función de limpieza que se ejecuta cuando el componente se desmonta o antes de que se vuelva a ejecutar el efecto. En este caso, usamos `clearInterval` para detener el intervalo y evitar fugas de memoria.

4. **Array de dependencias**:
   - El segundo argumento de `useEffect` es un array de dependencias `[]`. Un array vacío significa que el efecto solo se ejecutará una vez, cuando el componente se monte. Si incluyéramos variables en este array, el efecto se ejecutaría cada vez que alguna de esas variables cambiara.

##### Uso común de `useEffect`

- **Cargar datos desde una API**: Podemos usar `useEffect` para hacer una llamada HTTP a una API y cargar datos cuando el componente se monta.
  
  ```javascript
  useEffect(() => {
    fetch('https://api.example.com/datos')
      .then(response => response.json())
      .then(data => {
        // Actualizamos el estado con los datos obtenidos
      });
  }, []); // Solo se ejecuta una vez cuando el componente se monta
  ```

- **Suscribirse a eventos**: También es común suscribirse a eventos globales (como eventos de scroll) y limpiarlos cuando el componente se desmonta.

```javascript
useEffect(() => {
  const handleScroll = () => {
    console.log('Usuario está haciendo scroll');
  };
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```
---

### **4. Estilizado básico en React**

El estilizado es una parte fundamental del desarrollo de aplicaciones web con React. Existen varias maneras de aplicar estilos a los componentes en React, cada una con sus ventajas y casos de uso específicos. En esta sección, exploraremos las técnicas más comunes para aplicar estilos en componentes, que incluyen el uso de **estilos en línea**, **módulos CSS** y **librerías externas de estilos**.

---

#### 4.1. **CSS en React**

Al trabajar con React, se pueden aplicar estilos de diferentes maneras para crear interfaces atractivas y funcionales. A continuación, describimos algunas de las formas más comunes de estilizar componentes en React.

---

### 1. **Estilos en línea**

Los **estilos en línea** son una de las formas más simples y directas de aplicar CSS en React. Se aplican directamente a los elementos dentro de la propiedad `style`, que espera un **objeto de JavaScript** en lugar de un string como en HTML tradicional. Esto significa que los nombres de las propiedades de CSS deben estar escritos en **camelCase** en lugar de la notación estándar con guiones.

##### Ejemplo de estilos en línea:

```javascript
function Caja() {
  const estiloCaja = {
    backgroundColor: 'blue',  // camelCase en lugar de background-color
    color: 'white',
    padding: '10px',
    borderRadius: '5px'
  };

  return <div style={estiloCaja}>Soy una caja estilizada</div>;
}

export default Caja;
```

En este ejemplo, hemos definido un objeto `estiloCaja` que contiene las propiedades CSS que queremos aplicar. Este objeto se pasa a la propiedad `style` del elemento `div`. 

#### Ventajas de los estilos en línea:
- **Simplicidad**: Ideal para aplicar estilos simples y específicos a un único componente.
- **Dinámicos**: Puedes utilizar el poder de JavaScript para crear estilos condicionales o basados en variables.

#### Desventajas de los estilos en línea:
- **Reutilización limitada**: No es la mejor opción para estilos que necesitan ser reutilizados en varios componentes.
- **Legibilidad**: Con demasiadas reglas CSS en línea, el código puede volverse difícil de leer y mantener.
- **Limitaciones**: Algunas propiedades CSS, como las pseudoclases (`:hover`, `:focus`), no se pueden aplicar con estilos en línea.

##### Ejemplo de estilos dinámicos:

Los estilos en línea son útiles cuando necesitas que ciertos estilos cambien en función del estado del componente.

```javascript
function Boton() {
  const [activo, setActivo] = useState(false);

  const estiloBoton = {
    backgroundColor: activo ? 'green' : 'gray',  // Cambia de color según el estado
    color: 'white',
    padding: '10px',
    borderRadius: '5px'
  };

  return (
    <button
      style={estiloBoton}
      onClick={() => setActivo(!activo)}
    >
      {activo ? 'Activo' : 'Inactivo'}
    </button>
  );
}
```

En este ejemplo, el color de fondo del botón cambia según el estado `activo`. Si el botón está activo, su color es verde; de lo contrario, es gris. Este es un buen ejemplo del uso de estilos dinámicos con React.

---

### 2. **Módulos CSS**

Los **módulos CSS** son una técnica muy utilizada en React para escribir estilos de una manera que evita los conflictos de nombres de clases. Cada archivo de módulo CSS encapsula sus estilos localmente al componente, lo que garantiza que los nombres de clase sean únicos y no entren en conflicto con otros componentes.

#### ¿Cómo funcionan los módulos CSS?

Un **módulo CSS** es simplemente un archivo `.css` que, al ser importado, transforma los nombres de clases en identificadores únicos. Esto permite que los componentes utilicen clases CSS sin preocuparse por colisiones de nombres en la aplicación.

##### Ejemplo usando módulos CSS:

**Archivo CSS (Boton.module.css):**

```css
/* archivo: Boton.module.css */
.boton {
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.boton:hover {
  background-color: darkgreen;
}
```

**Componente React (Boton.js):**

```javascript
import React from 'react';
import styles from './Boton.module.css';

function Boton() {
  return <button className={styles.boton}>Click me</button>;
}

export default Boton;
```

##### Explicación del ejemplo:

1. **Creación del módulo CSS**: Creamos un archivo CSS llamado `Boton.module.css`. Definimos una clase `.boton` con varias reglas CSS, incluyendo un estilo de hover.
   
2. **Importación del módulo en React**: En el archivo `Boton.js`, importamos el módulo CSS usando `import styles from './Boton.module.css';`.

3. **Aplicación de la clase**: En lugar de usar un string con el nombre de la clase, utilizamos `styles.boton`. React se encarga de generar un nombre de clase único basado en la clase `boton`, por lo que no habrá conflictos con otras clases de la aplicación.

#### Ventajas de los módulos CSS:
- **Evitan colisiones de nombres**: Los módulos CSS generan automáticamente nombres de clase únicos.
- **Encapsulamiento**: Los estilos de un componente no afectan a otros componentes, lo que ayuda a mantener el código organizado y predecible.
- **Escalabilidad**: A medida que tu aplicación crece, los módulos CSS mantienen el código CSS organizado y fácil de mantener.

#### Desventajas de los módulos CSS:
- **Configuración inicial**: Aunque es bastante sencillo, los módulos CSS requieren una configuración inicial en el proyecto.
- **Curva de aprendizaje**: Los desarrolladores nuevos pueden necesitar adaptarse al uso de nombres de clases dinámicos y a la estructura de importación.

##### Ejemplo de uso condicional de clases con módulos CSS:

En ocasiones, necesitarás aplicar clases CSS basadas en el estado o las props del componente.

```javascript
import React, { useState } from 'react';
import styles from './Boton.module.css';

function Boton() {
  const [activo, setActivo] = useState(false);

  return (
    <button
      className={activo ? styles.botonActivo : styles.botonInactivo}
      onClick={() => setActivo(!activo)}
    >
      {activo ? 'Activo' : 'Inactivo'}
    </button>
  );
}

export default Boton;
```

**Boton.module.css**:
```css
.botonActivo {
  background-color: green;
  color: white;
}

.botonInactivo {
  background-color: gray;
  color: white;
}
```

En este ejemplo, utilizamos dos clases diferentes del archivo de módulos CSS (`botonActivo` y `botonInactivo`), que se aplican de forma condicional según el estado `activo`.

---

### 3. **Otras formas de estilizado en React**

Además de los estilos en línea y los módulos CSS, hay otras técnicas y herramientas populares para aplicar estilos en React.

#### **Styled Components**:

**Styled Components** es una librería de **CSS-in-JS** que permite escribir estilos directamente en los componentes utilizando la sintaxis de JavaScript. Los estilos se definen como componentes, lo que permite encapsular completamente el diseño dentro del propio componente.

```javascript
import styled from 'styled-components';

const Boton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

function App() {
  return <Boton>Click me</Boton>;
}

export default App;
```

**Ventajas de Styled Components**:
- Los estilos son completamente encapsulados.
- Puedes aprovechar el poder de JavaScript dentro de los estilos, como utilizar variables, funciones o props.
- Gran flexibilidad y popularidad en el ecosistema React.

#### **Frameworks de UI como Bootstrap o Material-UI**:

Si prefieres usar frameworks preconstruidos, **Bootstrap**, **Material-UI** y **Tailwind CSS** son opciones muy populares. Estos frameworks proporcionan componentes y estilos predefinidos que permiten crear rápidamente interfaces atractivas sin tener que escribir mucho CSS personalizado.
