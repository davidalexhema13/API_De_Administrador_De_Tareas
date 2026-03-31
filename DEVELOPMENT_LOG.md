# Bitácora de Desarrollo

##  Uso de Asistentes de IA

### 1. Configuración de Prisma v7

**Prompt utilizado:** "Cómo configurar PrismaClient con Neon en Prisma v7"

**Qué se aceptó:** Se adoptó el uso del adapter `PrismaNeon`, ya que Prisma v7 requiere adapters explícitos para gestionar el pool de conexiones. Esto garantiza compatibilidad con entornos serverless y evita el agotamiento de conexiones en Neon.

**Qué se rechazó:** La configuración tradicional de declarar `url` directamente en el bloque `datasource` de `schema.prisma`. En Prisma v7 esta práctica genera el error `P1012`, ya que la arquitectura del ORM ahora exige inyección dinámica de la conexión, no una definición estática en el archivo de modelos.

**Verificación realizada:** Se validó ejecutando `npm run dev` y realizando un `POST /api/auth/register`. Se confirmó la correcta persistencia del usuario en la base de datos Neon con sus relaciones íntegras.

---

### 2. Validación de datos con AJV

**Prompt utilizado:** "Cómo validar entradas con AJV en TypeScript usando módulos ESM"

**Qué se aceptó:** La implementación de esquemas de validación JSON Schema para los endpoints de registro, autenticación y gestión de tareas. Esto garantiza la integridad de los datos de entrada antes de que lleguen a la lógica de negocio.

**Qué se rechazó:** El uso de `ajv-formats` como función de inicialización automática, ya que genera incompatibilidades en entornos ESM. Se optó por registrar los formatos manualmente con `ajv.addFormat()`, logrando mayor control y estabilidad en el sistema de módulos moderno.

**Verificación realizada:** Se probaron escenarios de error enviando correos electrónicos inválidos, confirmando que la API responde correctamente con `400 Bad Request` y mensajes de error descriptivos.

---

### 3. Gestión de Variables de Entorno — Patrón Singleton

**Prompt utilizado:** "Implementar EnvConfig Singleton en TypeScript"

**Qué se aceptó:** La creación de una clase `EnvConfig` con patrón Singleton para centralizar la lectura de `process.env`. Aporta tipado fuerte para `PORT`, `DATABASE_URL` y `JWT_SECRET`, valores por defecto seguros y validación en el arranque del servidor.

**Qué se rechazó:** Cargar `dotenv.config()` en múltiples archivos, ya que puede generar colisiones de memoria y dificulta el rastreo de errores de configuración. El Singleton garantiza una única carga controlada.

**Verificación realizada:** Se comprobó que si falta una variable crítica en el `.env`, el servidor lanza un `console.error` descriptivo y aborta el arranque de forma segura, evitando comportamientos erráticos.

---

##  Decisiones Técnicas Propias (sin asistencia de IA)

### 1. Infraestructura Cloud — Elección de Neon como base de datos

Se eligió Neon (PostgreSQL) sobre una base de datos local por dos razones principales: garantizar disponibilidad inmediata del entorno sin configuración adicional, y practicar el manejo de certificados SSL en conexiones a entornos productivos reales. Esto expuso el proyecto a un escenario más cercano a producción desde el primer día de desarrollo.

### 2. Tipado estricto de la Request con Generics de TypeScript

En lugar de tipar las peticiones como `req: any` o usar el tipo genérico `Request` de Express, se extendieron las interfaces del framework para incluir los tipos exactos de `body` y `params` en cada endpoint:
```ts
Request<{ id: string }, {}, CreateTaskDto>
```

Esto permite que TypeScript detecte en tiempo de compilación cualquier acceso a propiedades inexistentes o mal tipadas, reduciendo errores en runtime y mejorando la experiencia de desarrollo con autocompletado preciso.

### 3. Formato de Respuesta Consistente — Standard API Response

Se decidió que todos los controladores, tanto en éxito como en error, devuelvan siempre un objeto con la misma estructura:
```ts
{ success: boolean, data?: any, error?: string }
```

Esto evita que el cliente tenga que adivinar la forma de la respuesta según el endpoint. Cualquier consumidor de la API puede manejar todas las respuestas con un único interceptor, simplificando la integración y haciendo la API predecible y profesional.

---

##  Retos y Soluciones

| Reto Técnico | Solución Implementada |
|---|---|
| Prisma v7 rechaza `url` en `schema.prisma` con error `P1012` | Se trasladó la configuración a `prisma.config.ts` usando `datasource.url` con inyección dinámica |
| `PrismaClient` lanzaba excepción al inicializar | Se integró el adapter `PrismaNeon` en `db.ts` para que el cliente reconozca el driver de Neon |
| `ajv-formats` generaba error de inicialización en ESM | Se reemplazó por validaciones manuales con `ajv.addFormat()` para compatibilidad total con ESM |
| `fecha_vencimiento` se almacenaba como `null` o string inválido | Se aplicó conversión explícita `new Date(fecha_vencimiento)` en la capa de servicios antes de la persistencia |
| Riesgo de exposición de `JWT_SECRET` en arranque incompleto | El Singleton de `EnvConfig` valida su presencia en el constructor y aborta el arranque si no existe |
| Error `[Object: null prototype]` al iniciar en Railway | Se compiló el proyecto con `tsc` generando un `dist/` y se usó `// @ts-ignore` para el import de `PrismaClient` en Prisma v7 |
| Railway no encontraba el punto de entrada | Se configuró `main` y `start` en `package.json` apuntando a `dist/server.js` |