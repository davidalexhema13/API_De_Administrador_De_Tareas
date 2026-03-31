import * as dotenv from "dotenv";

// Carga las variables del archivo .env al entorno de ejecución
dotenv.config();

/**
 * Clase EnvConfig (Patrón Singleton)
 * 
 * Centraliza la gestión de variables de entorno de la aplicación.
 * Proporciona tipado fuerte (TypeScript) y valores por defecto, 
 * evitando errores de 'undefined' en tiempo de ejecución.
 */
class EnvConfig {
  private static instance: EnvConfig;

  /** Puerto en el que correrá el servidor Express */
  public readonly PORT: number;
  
  /** URL de conexión a la base de datos (Neon/PostgreSQL) */
  public readonly DATABASE_URL: string;
  
  /** Secreto para la firma y verificación de tokens JWT */
  public readonly JWT_SECRET: string;

  /**
   * El constructor es privado para evitar instanciaciones externas 
   * fuera del método getInstance.
   */
private constructor() {
    // 1. Conversión a número con valor de respaldo para el puerto
    this.PORT = Number(process.env.PORT) || 3000;
    
    // 2. Asignación de la URL de Neon (PostgreSQL)
    this.DATABASE_URL = process.env.DATABASE_URL as string;

    // 3. Asignación del secreto para los Tokens JWT
    this.JWT_SECRET = process.env.JWT_SECRET as string;

    // 4. Validación de seguridad 
    if (!this.DATABASE_URL || !this.JWT_SECRET) {
      console.error(" ERROR CRÍTICO: Faltan variables de entorno esenciales en el archivo .env");
      process.exit(1); // Detiene la app si no hay base de datos o secreto
    }
  }
  /**
   * Retorna la instancia única de la configuración.
   * Si no existe, la crea; si ya existe, retorna la actual.
   * 
   * @returns {EnvConfig} Instancia de configuración
   */
  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }
}

/**
 * Exportación de la instancia única para ser usada en toda la App.
 * Ejemplo de uso: import { env } from './config/env.js';
 */
export const env = EnvConfig.getInstance();