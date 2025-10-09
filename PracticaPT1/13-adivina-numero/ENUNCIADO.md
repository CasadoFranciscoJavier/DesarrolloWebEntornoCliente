# Ejercicio 13: Adivina el Número

## Objetivo
Crear un juego donde el jugador debe adivinar un número secreto con ayuda de pistas.

## Requisitos funcionales

### Configuración del juego
- Rango personalizable (ej: 1-100, 1-500, etc.)
- Número máximo de intentos: 3-15
- Número secreto generado aleatoriamente

### Sistema de pistas
- Indicar si el número es mayor o menor
- Sistema de temperatura:
  - Muy caliente (≤5 de distancia)
  - Caliente (≤10)
  - Tibio (≤20)
  - Frío (≤30)
  - Muy frío (>30)
- Indicar si te estás acercando o alejando

### Mecánica del juego
- Jugador ingresa un número
- Sistema proporciona pistas
- Mostrar historial de intentos con distancias
- Ganar al adivinar o perder al agotar intentos

### Interfaz
- Input para ingresar número
- Botón verificar
- Historial de intentos
- Pistas claras y visibles
- Enter para enviar intento

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Escalable en rango e intentos

## Criterios de evaluación
- Sistema de pistas funcionando correctamente
- Cálculo preciso de distancias
- Interfaz clara
- Código limpio
