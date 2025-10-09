# Ejercicio 23: Calculadora de IMC (Índice de Masa Corporal)

## Objetivo
Crear una calculadora de IMC con interpretación de resultados y sistema de unidades.

## Requisitos funcionales

### Entrada de datos
- Sistema de unidades: Métrico (kg/cm) e Imperial (lb/in)
- Peso con validación (números positivos)
- Altura con validación (números positivos)
- Conversión automática entre sistemas
- Edad (opcional, para contexto)
- Género (opcional, para recomendaciones)

### Cálculo de IMC
- Fórmula métrica: peso(kg) / (altura(m))²
- Fórmula imperial: (peso(lb) / (altura(in))²) × 703
- Redondeo a 1 decimal
- Validación de rangos razonables

### Categorías de IMC (OMS)
- Bajo peso: < 18.5
- Peso normal: 18.5 - 24.9
- Sobrepeso: 25 - 29.9
- Obesidad I: 30 - 34.9
- Obesidad II: 35 - 39.9
- Obesidad III: >= 40

### Resultados
- Mostrar valor de IMC
- Categoría con código de colores
- Indicador visual (barra/gauge)
- Rango saludable sugerido
- Diferencia con peso ideal
- Consejos básicos según categoría

### Historial
- Guardar últimas 10 mediciones
- Mostrar fecha y hora
- Comparar evolución
- Gráfico simple de tendencia (opcional)
- Limpiar historial

### Interfaz
- Toggle entre sistemas de unidades
- Inputs con unidades claramente marcadas
- Display grande para resultado
- Colores según categoría (verde, amarillo, naranja, rojo)
- Diseño limpio y profesional

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Usar useState
- Cálculos sin librerías externas

## Criterios de evaluación
- Cálculo matemático correcto
- Conversión de unidades precisa
- Categorización correcta según OMS
- Validación de entrada funcional
- Historial operativo
- Código limpio y mantenible
