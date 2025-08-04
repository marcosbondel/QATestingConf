# 🔗 Integration Testing with Express, MongoDB and Jest

Este proyecto muestra cómo escribir pruebas de integración para una API REST utilizando:

- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)

## 📌 Descripción

El proyecto implementa una API modular con endpoints de autenticación y manejo de empresas.  
Las pruebas verifican el correcto comportamiento de la API como un todo, incluyendo base de datos, middlewares y rutas.

## ⚙️ Requisitos

- Node.js v18+
- MongoDB local o remoto (define la URI en `.env.test`)
- npm

## 🛠️ Instalación

```bash
npm install
```

## ⚙️ Variables de entorno

Crea un archivo `.env.test` basado en tu configuración:

```
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/testing_db
SERVER_PORT=3001
JWT_SECRET=supersecret
```

## 🧪 Ejecutar pruebas

```bash
NODE_ENV=test npm test
```

## 🗂️ Estructura

```
2-IntegrationTesting/
├── src/                   --> Código fuente de la API
├── tests/                 --> Pruebas de integración
│   ├── requests/
│   │   └── v1.0/
│   │       ├── auth/
│   │       └── companies/
│   ├── mocks/             --> Datos falsos para pruebas
│   └── helper.js          --> Setup de pruebas
└── .env.test              --> Variables de entorno para testing
```

## ✅ ¿Qué se prueba aquí?

* Peticiones HTTP a la API
* Validación de respuestas (status codes, estructura, headers)
* Comportamiento de endpoints con la base de datos conectada

---

💡 Ideal para validar que todos los componentes del sistema trabajan correctamente juntos.