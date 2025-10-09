# Ejercicio 4: Snake (Serpiente)

## Objetivo
Crear el clásico juego de la serpiente (Snake) utilizando React y hooks, con cuadrícula escalable.

## Requisitos funcionales

### Configuración del juego
- El jugador debe poder elegir el tamaño de la cuadrícula antes de iniciar (entre 10x10 y 30x30)
- La serpiente comienza con un solo segmento en el centro de la cuadrícula
- La comida aparece aleatoriamente en una posición libre

### Mecánica del juego
- La serpiente se mueve continuamente en la dirección seleccionada
- El jugador controla la dirección usando las flechas del teclado (↑↓←→)
- No se puede girar 180 grados instantáneamente (no se puede ir de derecha a izquierda directamente)
- La serpiente crece un segmento cada vez que come
- La velocidad del juego aumenta ligeramente con cada comida

### Sistema de puntuación
- Cada comida vale 10 puntos
- La puntuación se muestra en tiempo real
- Se muestra la puntuación final al perder

### Condiciones de derrota
El juego termina si:
- La serpiente choca con los bordes de la cuadrícula
- La serpiente choca consigo misma

### Interfaz visual
- Diferenciar visualmente la cabeza de la serpiente del cuerpo
- Mostrar claramente la comida
- Mostrar la puntuación actual
- Cuadrícula con bordes definidos

### Controles del juego
- Flechas del teclado para cambiar dirección
- Botón para iniciar juego
- Botón para reiniciar después de perder
- Control deslizante (slider) para elegir tamaño de cuadrícula

## Restricciones técnicas
- Solo modificar el archivo App.jsx
- No usar `break` en ninguna parte del código
- Cada función debe tener un único `return`
- Usar `useState` y `useEffect` apropiadamente
- El juego debe ser escalable (tamaño de cuadrícula configurable)
- La comida nunca debe aparecer sobre la serpiente

## Criterios de evaluación
- Correcto uso de useEffect para el movimiento continuo
- Manejo apropiado de eventos del teclado
- Lógica de colisión implementada correctamente
- Interfaz funcional y responsive
- Código limpio sin `break` y con un solo `return` por función
- Escalabilidad del tamaño de la cuadrícula
