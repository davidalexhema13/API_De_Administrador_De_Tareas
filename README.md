# Sistema de Gestión de Tareas

API RESTful desarrollada con Node.js, Express y TypeScript que permite a los usuarios registrarse, autenticarse y administrar sus tareas personales.

## Arquitectura

El proyecto sigue una arquitectura en capas:

- `src/api` — Rutas y middlewares
- `src/controlador` — Controladores que manejan las peticiones HTTP
- `src/servicios` — Lógica de negocio
- `src/persistencia` — Comunicación con la base de datos (Prisma + PostgreSQL)
- `src/config` — Configuración centralizada (DB, Swagger, variables de entorno)
- `src/utils` — Utilidades (JWT, validación, errores)

## Tecnologías

- Node.js + Express.js
- TypeScript
- PostgreSQL (Neon)
- Prisma ORM v7
- JWT para autenticación
- AJV para validación
- Swagger para documentación

## Instalación

1. Clona el repositorio:
```bash
git clone <https://github.com/davidalexhema13/API_De_Administrador_De_Tareas.git>
cd GestionDeTareas
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

Edita `.env` con tus valores:
```
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@host/nombre_db
JWT_SECRET=tu_secreto_aqui
```

4. Genera el cliente de Prisma:
```bash
npx prisma generate
```

5. Ejecuta las migraciones:
```bash
npx prisma migrate dev
```

## Ejecución
```bash
npm run dev
```



El servidor correrá en `http://localhost:3000`

## Documentación

Swagger disponible en: `http://localhost:3000/api/docs`



## Testing

Las pruebas de integración están escritas con **Vitest** y **Supertest**.

Para ejecutar las pruebas:
```bash
npm test
```

Las pruebas cubren los endpoints de autenticación:
- POST /api/auth/register — registro de usuario
- POST /api/auth/login — credenciales incorrectas

## Endpoints

### Auth
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |

### Tasks (requieren token JWT)
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/tasks | Crear tarea |
| GET | /api/tasks | Listar tareas |
| GET | /api/tasks/:id | Ver tarea |
| PUT | /api/tasks/:id | Actualizar tarea |
| DELETE | /api/tasks/:id | Eliminar tarea |