# Ejercicio 22: Calculadora de Propinas

## Objetivo
Crear una calculadora de propinas con división de cuenta y cálculo automático.

## Requisitos funcionales

### Entrada de datos
- Monto total de la cuenta
- Porcentaje de propina (con botones predefinidos: 10%, 15%, 18%, 20%, 25%)
- Opción de propina personalizada
- Número de personas para dividir la cuenta
- Validación de entradas numéricas positivas

### Cálculos
- Calcular propina basada en el porcentaje
- Calcular total con propina incluida
- Dividir total entre número de personas
- Mostrar cantidad por persona (base + propina)
- Redondear a 2 decimales

### Funcionalidades adicionales
- Botones de porcentaje rápido
- Slider para ajustar propina visualmente
- Incrementar/decrementar número de personas
- Modo de servicio (malo, bueno, excelente) con porcentajes sugeridos
- Resetear todos los campos

### Display de resultados
- Monto original
- Propina calculada
- Total con propina
- Por persona (si hay división)
- Desglose visual claro

### Interfaz
- Diseño limpio tipo app móvil
- Botones grandes y accesibles
- Indicadores visuales del porcentaje
- Colores diferentes para cada sección
- Animaciones suaves en cambios

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Usar useState
- Cálculos matemáticos sin librerías

## Criterios de evaluación
- Todos los cálculos correctos
- Validación de entrada funcional
- Porcentajes predefinidos funcionan
- División entre personas correcta
- Código limpio y mantenible
