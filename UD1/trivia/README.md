# PT1: React

## [Enlace GitHub](https://classroom.github.com/a/w9w-tXqn)

### Instrucciones:

1. **Dividir la Aplicación en Componentes**:
   La aplicación debe dividirse en los siguientes tres componentes, los cuales se encargarán de una responsabilidad específica:
   
   - **`Trivia`**: Componente principal que gestiona el estado de la aplicación (pregunta actual y quesitos) y coordina los demás componentes.
   - **`Pregunta`**: Componente que muestra la pregunta actual y las opciones de respuesta, y permite que el usuario seleccione una opción.
   - **`Quesito`**: Componente que muestra la imagen de progreso de quesitos en función de la cantidad ganada.

2. **Implementación Específica de los Componentes**:

   - **`Trivia`**:
     - Importa y usa los componentes `Pregunta` y `Quesito`.
     - Gestiona el estado `preguntaActual` y `quesitos`.
     - Implementa la función `seleccionarPreguntaAleatoria()` para seleccionar aleatoriamente una pregunta del archivo `preguntas.json`.
     - Implementa la función `manejarRespuesta(respuesta)` para verificar si la respuesta es correcta:
       - Si la respuesta es incorrecta, se debe mostrar un alert() indicándolo.
       - Si la respuesta es correcta, aumenta el número de quesitos en 1.
       - Si se alcanzan 7 quesitos, muestra un mensaje de victoria y reinicia el juego.
     - Implementa `reiniciarJuego()` para reiniciar el progreso y seleccionar una nueva pregunta.
     - Pasa las propiedades necesarias a los componentes `Pregunta` y `Quesito` para que puedan funcionar correctamente.

   - **`Pregunta`**:
     - Recibe la pregunta actual y las opciones de respuesta desde el componente `Trivia`.
     - Muestra la pregunta y los botones de las opciones.
     - Permite seleccionar una opción y llama a la función `manejarRespuesta` desde `Trivia` con la respuesta seleccionada.

   - **`Quesito`**:
     - Recibe el número de quesitos desde `Trivia`.
     - Muestra la imagen correspondiente de acuerdo al número de quesitos (utiliza las imágenes importadas: `quesito0.png` a `quesito7.png`).

3. **Completar el Código de Funciones en `Trivia`**:
   - Completa el código de las funciones `seleccionarPreguntaAleatoria()`, `manejarRespuesta(respuesta)`, y `reiniciarJuego()` en `Trivia` para hacer funcionar la aplicación como se describe.
   - Asegúrate de que el componente `Pregunta` muestra una nueva pregunta aleatoria cada vez que el usuario responde correctamente.
   - Reinicia el juego a 0 quesitos cuando el jugador gana.