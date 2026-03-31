# Bitácora de Desarrollo

## Uso de Asistentes de IA

### 1. Configuración de Prisma v7
**Prompt utilizado:** "Cómo configurar PrismaClient con Neon en Prisma v7"

**Qué se aceptó:** El uso del adapter `PrismaNeon` porque Prisma v7 requiere adapters explícitos para conectarse, a diferencia de versiones anteriores.

**Qué se rechazó:** La sugerencia inicial de poner `url` en `schema.prisma` — en Prisma v7 esto ya no es válido y genera error P1012.

**Verificación:** Se comprobó corriendo `npm run dev` y haciendo un POST a `/api/auth/register` que guardó correctamente en Neon.

---

### 2. Validación con AJV
**Prompt utilizado:** "Cómo validar entradas con AJV en TypeScript ESM"

**Qué se aceptó:** Los schemas de validación para register, login y tasks.

**Qué se rechazó:** El uso de `ajv-formats` como función — causaba error en ESM, se reemplazó por `ajv.addFormat()` manual.

**Verificación:** Se probó enviando un email inválido y confirmando que devuelve error 400.

---

## Decisiones sin asistencia de IA

1. **Usar Neon como base de datos cloud** — Se eligió por su capa gratuita y compatibilidad directa con Prisma, evitando configurar PostgreSQL local.

2. **Separar rutas y controladores** — Se decidió mantener las rutas limpias con solo los decoradores Swagger y delegar toda la lógica a los controladores y servicios.

---

## Retos y Soluciones

| Reto | Solución |
|------|----------|
| Prisma v7 no acepta `url` en schema.prisma | Se movió la URL a `prisma.config.ts` con `datasource.url` |
| PrismaClient lanzaba error al iniciar | Se agregó el adapter `PrismaNeon` en `db.ts` |
| `ajv-formats` no funcionaba en ESM | Se reemplazó por `ajv.addFormat()` manual |
| `fecha_vencimiento` llegaba null | Se convirtió el string a `Date` en el servicio |