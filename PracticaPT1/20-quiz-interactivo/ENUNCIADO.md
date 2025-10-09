# Ejercicio 20: Quiz Interactivo

## Objetivo
Crear un quiz interactivo con múltiples categorías, sistema de puntuación y estadísticas.

## Requisitos funcionales

### Sistema de preguntas
- Base de datos de preguntas con categorías (Historia, Ciencia, Deportes, Geografía)
- Preguntas de opción múltiple (4 opciones)
- Mínimo 5 preguntas por categoría
- Mezclar orden de preguntas y respuestas

### Gameplay
- Seleccionar categoría antes de empezar
- Opción "Todas las categorías" (mix)
- Mostrar pregunta actual y número total
- Marcar respuesta seleccionada
- Botón "Siguiente" para avanzar
- No poder retroceder
- Timer opcional por pregunta (configurable)

### Puntuación
- Sistema de puntos por respuesta correcta
- Bonus por velocidad si timer activado
- Mostrar puntuación durante el quiz
- Feedback inmediato (correcto/incorrecto)
- Indicar respuesta correcta si falla

### Estadísticas finales
- Puntuación total
- Porcentaje de aciertos
- Tiempo total empleado
- Preguntas correctas/incorrectas
- Desglose por categoría
- Opción de reintentar

### Interfaz
- Diseño limpio y moderno
- Animaciones para transiciones
- Indicador de progreso
- Timer visual si activado
- Colores para correcto/incorrecto

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Usar useState
- Barajar arrays sin librerías externas

## Criterios de evaluación
- Base de datos de preguntas completa
- Sistema de puntuación funcional
- Timer opcional operativo
- Estadísticas precisas
- Código limpio y organizado
