                     Prueba Técnica – Vitrinnea (Gestor de Tareas)

Aplicación full stack desarrollada con React, Node.js, Express y MySQL.
Permite a los usuarios registrarse, iniciar sesión y gestionar tareas personales (crear, editar, eliminar y marcar como completadas).

💡 Este proyecto fue diseñado para fines de evaluación técnica, destacando el uso de buenas prácticas, arquitectura limpia y una interfaz moderna y responsive.

- Características principales:

Autenticación de usuarios con JWT

Base de datos MySQL local o remota

CRUD completo de tareas por usuario

Interfaz moderna y responsive con TailwindCSS v3.4.13

Diseño UX/UI limpio y adaptable a móviles

Separación clara entre frontend y backend

Seed automático para generar datos de prueba

- Tecnologías utilizadas
Frontend:

React 18+

Vite

TailwindCSS 3.4.13

React Router DOM

Backend:

Node.js 18+

Express.js

JWT (jsonwebtoken)

bcrypt

MySQL2

dotenv

cors

Nodemon
 (para desarrollo)

📁 Estructura del proyecto
Prueba_vitrinnea/
│
├── backend/
│   ├── src/
│   │   ├── db.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── seed.js
│   ├── package.json
│   ├── .env.example
│   └── ...
│
├── frontend/
│   └── Vitrinnea_Frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   └── images/
│       ├── package.json
│       ├── postcss.config.cjs
│       ├── tailwind.config.cjs
│       ├── .env.example
│       └── ...
│
├── sql/
│   └── schema.sql
│
├── .gitignore
└── README.md

- Configuración e instalación
Requisitos previos:

Asegúrate de tener instalado:

Node.js 18+

MySQL Server

Git

MySQL Workbench
 (opcional)

- Configurar la base de datos:

Crea la base de datos ejecutando el archivo sql/schema.sql:

Desde la terminal:

mysql -u root -p < sql/schema.sql


Desde MySQL Workbench:

Abre una conexión local.

Copia el contenido de sql/schema.sql.

Ejecuta el script.

Esto creará la base de datos todo_app con las tablas users y tasks.

- Configurar variables de entorno:

Crea los archivos .env a partir de los ejemplos incluidos:

cp backend/.env.example backend/.env
cp frontend/Vitrinnea_Frontend/.env.example frontend/.env


Luego, edita tus datos de conexión en backend/.env:

PORT=4000
JWT_SECRET=clave_super_secreta_para_pruebas

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=todo_app
DB_PORT=3306

CORS_ORIGIN=http://localhost:5173


Y en frontend/Vitrinnea_Frontend/.env:

VITE_API_URL=http://localhost:4000/api

- Instalar dependencias:
Backend
cd backend
npm install

Frontend
cd ../frontend/Vitrinnea_Frontend
npm install

- Generar datos de prueba (seed)

Desde la carpeta backend, ejecuta:

npm run seed


Esto insertará:

Usuario demo → demo@vitrinnea.com
 / 123456

3 tareas de ejemplo asociadas al usuario

- Ejecutar los servidores:
Backend
cd backend
npm run dev


El servidor correrá en:
➡️ http://localhost:4000

Frontend
cd ../frontend/Vitrinnea_Frontend
npm run dev


El frontend correrá en:
➡️ http://localhost:5173

***👤 Credenciales de prueba***
Campo	Valor
Email	demo@vitrinnea.com
Contraseña	123456

- Dependencias principales (versiones)
Backend: 
Paquete	Versión
express	^4.19.2
mysql2	^3.9.1
bcrypt	^5.1.1
jsonwebtoken	^9.0.2
dotenv	^16.4.5
cors	^2.8.5
nodemon	^3.1.0

Frontend
Paquete	Versión
react	^18.3.1
react-dom	^18.3.1
react-router-dom	^6.22.3
tailwindcss	^3.4.13
postcss	^8.4.31
autoprefixer	^10.4.17
vite	^5.2.0

- Notas a tomar en cuenta

El .env real no se incluye en el repositorio, solo .env.example por seguridad

Los scripts sql/schema.sql y backend/src/seed.js permiten reproducir exactamente el entorno con datos de ejemplo.

TailwindCSS está configurado manualmente en la versión 3.4.13 para asegurar compatibilidad con @apply.

Se ha agregado .gitignore para evitar incluir dependencias y credenciales sensibles.

- Pruebas rápidas

Una vez ejecutado todo, puedes probar:

Registro: crea una nueva cuenta.

Login: ingresa con la cuenta demo o la que creaste.

CRUD de tareas: crea, edita o elimina tareas.

Cerrar sesión: botón disponible en la barra de navegación.

*******************************************************************************
ENG

Technical Test – Vitrinnea (Task Manager)

Full stack application developed with React, Node.js, Express, and MySQL.
It allows users to register, log in, and manage personal tasks (create, edit, delete, and mark as completed).

This project was designed for technical evaluation purposes, highlighting best practices, clean architecture, and a modern, responsive interface.

Main Features

User authentication with JWT

Local or remote MySQL database

Full CRUD operations for user tasks

Modern and responsive interface with TailwindCSS v3.4.13

Clean UX/UI design adaptable to mobile devices

Clear separation between frontend and backend

Automatic seed generation for test data

Technologies Used
Frontend

React 18+

Vite

TailwindCSS 3.4.13

React Router DOM

Backend

Node.js 18+

Express.js

JWT (jsonwebtoken)

bcrypt

MySQL2

dotenv

cors

Nodemon (for development)

Project Structure
Prueba_vitrinnea/
│
├── backend/
│   ├── src/
│   │   ├── db.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── seed.js
│   ├── package.json
│   ├── .env.example
│   └── ...
│
├── frontend/
│   └── Vitrinnea_Frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   └── images/
│       ├── package.json
│       ├── postcss.config.cjs
│       ├── tailwind.config.cjs
│       ├── .env.example
│       └── ...
│
├── sql/
│   └── schema.sql
│
├── .gitignore
└── README.md

Setup and Installation
Requirements

Make sure you have installed:

Node.js 18+

MySQL Server

Git

MySQL Workbench (optional)

Database Setup

Create the database by running the file sql/schema.sql:

From the terminal:

mysql -u root -p < sql/schema.sql


From MySQL Workbench:

Open a local connection.

Copy the contents of sql/schema.sql.

Run the script.

This will create the database todo_app with the tables users and tasks.

Environment Variables

Create the .env files from the included examples:

cp backend/.env.example backend/.env
cp frontend/Vitrinnea_Frontend/.env.example frontend/.env


Then edit your connection data in backend/.env:

PORT=4000
JWT_SECRET=super_secret_key_for_testing

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_app
DB_PORT=3306

CORS_ORIGIN=http://localhost:5173


And in frontend/Vitrinnea_Frontend/.env:

VITE_API_URL=http://localhost:4000/api

Install Dependencies

Backend:

cd backend
npm install


Frontend:

cd ../frontend/Vitrinnea_Frontend
npm install

Generate Test Data (Seed)

From the backend folder, run:

npm run seed


This will insert:

Demo user → demo@vitrinnea.com
 / 123456

3 example tasks associated with the demo user

Run the Servers

Backend:

cd backend
npm run dev


The backend will run at:

http://localhost:4000


Frontend:

cd ../frontend/Vitrinnea_Frontend
npm run dev


The frontend will run at:

http://localhost:5173

Test Credentials
Field	Value
Email	demo@vitrinnea.com

Password	123456
Main Dependencies (Versions)
Backend
Package	Version
express	^4.19.2
mysql2	^3.9.1
bcrypt	^5.1.1
jsonwebtoken	^9.0.2
dotenv	^16.4.5
cors	^2.8.5
nodemon	^3.1.0
Frontend
Package	Version
react	^18.3.1
react-dom	^18.3.1
react-router-dom	^6.22.3
tailwindcss	^3.4.13
postcss	^8.4.31
autoprefixer	^10.4.17
vite	^5.2.0
Notes

The real .env file is not included in the repository, only .env.example for security purposes.

The scripts sql/schema.sql and backend/src/seed.js allow the environment to be fully reproduced with example data.

TailwindCSS is manually configured in version 3.4.13 to ensure compatibility with @apply.

.gitignore has been added to prevent committing dependencies and sensitive data.

Quick Tests

Once everything is running, you can test:

Register: Create a new account.

Login: Sign in using the demo user or a newly created one.

Task CRUD: Create, edit, or delete your tasks.

Logout: Use the “Logout” button in the navigation bar.