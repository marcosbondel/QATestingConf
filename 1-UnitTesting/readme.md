# 🧪 Unit Testing with Jest

Este proyecto contiene un ejemplo básico de **testing unitario** utilizando [Jest](https://jestjs.io).  
Ideal para entender cómo probar funciones puras de manera aislada.

## 📌 Descripción

En `src/calculator.js` encontrarás una serie de funciones matemáticas básicas como `sum`, `subtract`, etc.  
Las pruebas están ubicadas en `tests/calculator.test.js` y validan el comportamiento de estas funciones bajo diferentes entradas.

## ⚙️ Requisitos

- Node.js v18 o superior
- npm

## 🚀 Instalación

```bash
npm install
```

## 🧪 Ejecutar pruebas

```bash
npm test
```

## 📂 Estructura

```
1-UnitTesting/
├── src/
│   └── calculator.js        --> Funciones a testear
└── tests/
    └── calculator.test.js   --> Pruebas unitarias
```

## ✅ ¿Qué se prueba aquí?

* Funciones puras sin dependencias
* Casos límite y entradas inválidas
* Respuestas esperadas

---

¡Una base sólida para escribir código confiable! 🔒

```