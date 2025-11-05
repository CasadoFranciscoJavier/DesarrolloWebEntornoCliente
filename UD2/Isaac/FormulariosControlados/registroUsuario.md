### Ejercicio: Formulario controlado con validaciones en React

Crea un **formulario controlado** en React que permita ingresar los siguientes datos:

1. **Nombre:** debe tener una longitud mínima de **3** caracteres y máxima de **50**.
2. **Edad:** debe ser un número comprendido entre **0 y 120**.
3. **Email:** debe ser validado mediante una **expresión regular (regex)** que asegure un formato de correo electrónico válido.
4. **Contraseña:** debe cumplir las siguientes condiciones:

   * Contener al menos **una letra minúscula**.
   * Contener al menos **una letra mayúscula**.
   * Contener al menos **un número**.
   * Tener una longitud mínima de **6** y máxima de **20** caracteres.

El formulario debe:

* **Validar en tiempo real** el estado de cada campo (mientras el usuario escribe).
* **Mostrar mensajes de error debajo de cada input** indicando qué condición no se cumple.
* Al hacer clic en el botón **Submit**, **mostrar en la consola** todos los datos introducidos (solo si son válidos).