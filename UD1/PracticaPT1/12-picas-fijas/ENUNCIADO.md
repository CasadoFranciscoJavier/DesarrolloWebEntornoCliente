# Ejercicio 12: Picas y Fijas (MasterMind)

## Objetivo
Crear el juego de Picas y Fijas donde el jugador debe adivinar un código numérico secreto.

## Requisitos funcionales

### Configuración del juego
- Longitud del código: 3-6 dígitos
- Rango de números: 0-5 hasta 0-9 (configurable)
- Número máximo de intentos: 5-15 (configurable)

### Mecánica del juego
- El sistema genera un código secreto aleatorio
- El jugador ingresa un intento del mismo tamaño
- El sistema responde con:
  - **Fijas**: Números correctos en posición correcta
  - **Picas**: Números correctos en posición incorrecta
- El jugador gana si adivina el código completo
- El jugador pierde si agota los intentos

### Interfaz
- Teclado numérico visual
- Mostrar intento actual
- Historial de intentos con picas y fijas
- Indicar intentos restantes
- Mostrar el código al perder

### Controles
- Clicks en números para ingresar
- Botón borrar
- Botón verificar
- Botón reiniciar

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Escalable en longitud, rango y número de intentos

## Criterios de evaluación
- Correcta implementación de picas y fijas
- Lógica de comparación precisa
- Interfaz clara y funcional
- Código limpio
