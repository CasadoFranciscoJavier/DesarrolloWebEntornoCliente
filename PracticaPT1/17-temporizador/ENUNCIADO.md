# Ejercicio 17: Temporizador y Cronómetro

## Objetivo
Crear una aplicación con temporizador cuenta atrás y cronómetro cuenta arriba.

## Requisitos funcionales

### Modo Temporizador
- Configurar horas, minutos y segundos
- Botones de tiempo rápido (1, 5, 10, 15 min)
- Iniciar cuenta atrás
- Pausar y reanudar
- Reiniciar
- Mensaje al terminar

### Modo Cronómetro
- Iniciar cuenta desde 0
- Pausar y reanudar
- Reiniciar
- Contar indefinidamente

### Interfaz
- Selector de modo (Temporizador/Cronómetro)
- Display grande mostrando HH:MM:SS
- Inputs para configurar tiempo
- Botones de control claros
- Botones de tiempo rápido

### Funcionalidad
- useEffect para actualización cada segundo
- Limpieza de intervalos apropiada
- Validación de inputs (0-59 para min/seg)
- Cambio de modo reinicia todo

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Usar useState y useEffect
- Formato HH:MM:SS con padStart

## Criterios de evaluación
- Temporizador cuenta atrás correctamente
- Cronómetro cuenta arriba correctamente
- Pausar/Reanudar funcional
- Limpieza de intervalos apropiada
- Código limpio
