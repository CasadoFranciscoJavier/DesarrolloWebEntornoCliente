# Ejercicio 6: Simon Dice

## Objetivo
Crear el clásico juego Simon Dice donde el jugador debe memorizar y repetir secuencias de colores cada vez más largas.

## Requisitos funcionales

### Configuración del juego
- El juego tiene 4 botones de colores: rojo, verde, azul y amarillo
- La secuencia comienza con 1 color aleatorio
- Cada nivel añade un color más a la secuencia

### Mecánica del juego
- El juego muestra la secuencia de colores (iluminándolos uno por uno)
- Cada color se ilumina durante 400ms con 800ms entre colores
- Después de mostrar la secuencia, el jugador debe repetirla
- El jugador hace click en los botones en el orden correcto
- Si acierta toda la secuencia, pasa al siguiente nivel con un color más
- Si se equivoca en cualquier momento, pierde

### Sistema de niveles
- Nivel 1: 1 color
- Nivel 2: 2 colores
- Nivel 3: 3 colores
- Y así sucesivamente...
- Cada nivel exitoso añade un color aleatorio más

### Interfaz visual
- Mostrar el nivel actual
- Indicar claramente cuándo es el turno del juego (mostrando secuencia)
- Indicar claramente cuándo es el turno del jugador
- Efecto visual cuando un botón se ilumina
- Los botones deben tener colores bien diferenciados

### Estados del juego
- Mostrar mensaje "Observa la secuencia..." mientras el juego muestra los colores
- Mostrar mensaje "Tu turno" cuando el jugador debe repetir
- Bloquear clicks del jugador mientras se muestra la secuencia
- Mostrar el nivel alcanzado al perder

### Controles del juego
- Click en botones de colores para ingresar la secuencia
- Botón para iniciar juego
- Botón para jugar de nuevo después de perder

## Restricciones técnicas
- Solo modificar el archivo App.jsx
- No usar `break` en ninguna parte del código
- Cada función debe tener un único `return`
- Usar `useState` apropiadamente
- Usar `setTimeout` para las animaciones de secuencia

## Criterios de evaluación
- Correcta implementación de la lógica de Simon Dice
- Animaciones de secuencia funcionando correctamente
- Comparación precisa de la secuencia del jugador
- Interfaz clara e intuitiva
- Código limpio sin `break` y con un solo `return` por función
- Bloqueo apropiado de interacción durante la secuencia
