# QA Testing Conference

Este repositorio es un entorno interactivo diseñado para explorar dos enfoques fundamentales de pruebas en aplicaciones JavaScript modernas utilizando **Jest**:

- **Pruebas Unitarias**
- **Pruebas de Integración**

Cada enfoque está implementado en una carpeta independiente, con ejemplos funcionales, dependencias propias y una estructura clara.  
El objetivo es ayudarte a comprender **qué es el testing**, por qué es importante y cómo aplicarlo de manera efectiva en tus propios proyectos.

---

## 🧠 ¿Qué es Testing?

**Testing** (o pruebas de software) es el proceso de verificar que un programa funciona como se espera.  
Es una parte esencial del desarrollo profesional porque:

- Aumenta la confiabilidad del software
- Facilita el mantenimiento a largo plazo
- Previene errores antes de que lleguen a producción
- Permite refactorizar con confianza

Existen diferentes tipos de pruebas, cada una con un propósito particular. Este repositorio se enfoca en dos de las más comunes:

---

### 🔹 Unit Testing (Pruebas Unitarias)

Las pruebas unitarias verifican funciones o componentes individuales en aislamiento.  
Se centran en la lógica interna, sin depender de bases de datos, redes o servicios externos.

🧮 Ejemplo: probar que una función `sumar(2, 3)` devuelve `5`.

---

### 🔸 Integration Testing (Pruebas de Integración)

Las pruebas de integración verifican que diferentes partes del sistema trabajen correctamente juntas.  
Incluyen interacciones entre rutas, controladores, base de datos y otros servicios.

🌐 Ejemplo: enviar una petición HTTP a un endpoint `/login` y validar la respuesta con Supertest y Jest.

---

## 📁 Estructura del Proyecto

```

1-UnitTesting/         --> Pruebas unitarias simples (ej: funciones matemáticas)
2-IntegrationTesting/  --> Pruebas de integración con API, MongoDB y Supertest

```

---

## ⚙️ Requisitos

- Node.js v18 o superior
- npm

---

## 🚀 Cómo usar

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/jest-testing-playground.git
cd jest-testing-playground

# Ir a pruebas unitarias
cd 1-UnitTesting
npm install
npm test

# O ir a pruebas de integración
cd ../2-IntegrationTesting
npm install
npm test
```

---

Cada carpeta contiene su propio `README.md` con instrucciones específicas, dependencias y una breve introducción a su contenido.
Este proyecto es ideal para quienes están comenzando con **pruebas en JavaScript**, o desean reforzar sus conocimientos con ejemplos prácticos.

---

🎯 ¡Explora, rompe, prueba y aprende!

---


Built with :blue_heart: by **Marcos Bonifasi**
