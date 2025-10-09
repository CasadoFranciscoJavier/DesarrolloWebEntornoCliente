# Ejercicio 21: Conversor de Unidades

## Objetivo
Crear un conversor de unidades con múltiples categorías y conversión bidireccional.

## Requisitos funcionales

### Categorías de conversión
- Longitud (metros, kilómetros, millas, pies, pulgadas)
- Peso (gramos, kilogramos, libras, onzas)
- Temperatura (Celsius, Fahrenheit, Kelvin)
- Volumen (litros, mililitros, galones, pintas)
- Tiempo (segundos, minutos, horas, días)

### Funcionalidad
- Seleccionar categoría de conversión
- Entrada numérica con validación
- Seleccionar unidad origen y destino
- Conversión automática en tiempo real
- Botón para intercambiar unidades
- Mostrar fórmula de conversión
- Redondeo a 4 decimales

### Historial
- Guardar últimas 10 conversiones
- Mostrar categoría, valor y resultado
- Limpiar historial
- Reutilizar conversión del historial

### Validaciones
- Solo números positivos (excepto temperatura)
- Mensaje de error si entrada inválida
- Limpiar resultado si entrada vacía
- Indicar si origen y destino son iguales

### Interfaz
- Tabs o selector para categorías
- Inputs numéricos con labels claros
- Selectores de unidades
- Display grande para resultado
- Botón de intercambio visual

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Usar useState
- Sin librerías de conversión

## Criterios de evaluación
- Todas las conversiones matemáticamente correctas
- Validación de entrada funcional
- Historial operativo
- Intercambio de unidades funciona
- Código limpio y mantenible
