# Ejercicio 11: Dados Casino

## Objetivo
Crear un juego de dados de casino con múltiples tipos de apuestas y sistema de saldo.

## Requisitos funcionales

### Configuración del juego
- Elegir entre 2 y 4 dados
- Configurar monto de apuesta
- Saldo inicial de $100

### Tipos de apuestas
1. **Suma exacta**: Apostar a que la suma de los dados será un número específico
2. **Mayor**: Apostar a que la suma será mayor que la mitad del máximo posible
3. **Menor**: Apostar a que la suma será menor que la mitad del máximo posible
4. **Todos pares**: Apostar a que todos los dados saldrán pares
5. **Todos impares**: Apostar a que todos los dados saldrán impares
6. **Todos iguales**: Apostar a que todos los dados mostrarán el mismo número

### Sistema de multiplicadores
- Suma exacta: x5 (2 dados), x8 (3 dados), x10 (4 dados)
- Mayor/Menor: x2
- Todos pares/impares: x3
- Todos iguales: x10 (2 dados), x20 (3 dados), x30 (4 dados)

### Animación
- Los dados giran durante el lanzamiento
- Mostrar suma total de los dados
- Indicar resultado claramente

## Restricciones técnicas
- Solo App.jsx
- Sin break
- Un solo return por función
- Usar useState
- Escalable en número de dados

## Criterios de evaluación
- Correcta implementación de todos los tipos de apuesta
- Sistema de multiplicadores correcto
- Animación fluida de dados
- Código limpio y funcional
