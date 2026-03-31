/**
 * Configuración del Cliente de Prisma con Adaptador Nativo para Neon.
 * 
 * Se utiliza '@prisma/adapter-neon' para optimizar las consultas a través de 
 * WebSockets, permitiendo una conexión más estable y rápida en entornos en la nube.
 * 
 * @module PrismaConfig
 */
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client/default.js";
import * as dotenv from "dotenv";

// Carga las variables de entorno (.env)
dotenv.config();

/**
 * Adaptador de conexión para PostgreSQL en Neon.
 * Utiliza la variable de entorno DATABASE_URL.
 */
const adapter = new PrismaNeon({ 
    connectionString: process.env.DATABASE_URL as string 
});

/**
 * Instancia única (Singleton) del cliente de Prisma para toda la aplicación.
 */
const prisma = new PrismaClient({ adapter });

export default prisma;