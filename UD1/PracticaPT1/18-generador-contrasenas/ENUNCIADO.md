# Ejercicio 18: Generador de Contraseñas

## Objetivo
Crear un generador de contraseñas seguras con opciones personalizables.

## Requisitos funcionales

### Configuración de contraseña
- Longitud ajustable (4-50 caracteres) con slider
- Incluir/excluir mayúsculas
- Incluir/excluir minúsculas
- Incluir/excluir números
- Incluir/excluir símbolos
- Al menos una opción debe estar marcada

### Generación
- Botón para generar contraseña
- Mostrar contraseña generada
- Calcular fortaleza (Débil, Media, Fuerte, Muy Fuerte)
- Copiar al portapapeles

### Sistema de fortaleza
- Basado en longitud y variedad de caracteres
- Indicador visual claro
- Puntuación acumulativa

### Historial
- Guardar últimas 10 contraseñas generadas
- Mostrar fecha de generación
- Copiar contraseñas del historial
- Limpiar historial

### Interfaz
- Display grande para contraseña actual
- Checkboxes para opciones
- Slider para longitud
- Botón copiar

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Usar useState
- navigator.clipboard para copiar

## Criterios de evaluación
- Generación aleatoria correcta
- Cálculo de fortaleza preciso
- Todas las opciones funcionan
- Historial operativo
- Código limpio
