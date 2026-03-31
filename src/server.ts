/**
 * Punto de Entrada de Ejecución (Server Entry Point).
 * 
 * Este archivo es el responsable de iniciar el proceso del servidor HTTP.
 * Separa la configuración de la aplicación (app.ts) de la ejecución lógica 
 * del servidor, permitiendo una mejor testabilidad y organización.
 */
import app from "./app.js";
import { env } from "./config/env.js";

/**
 * Inicia el servidor Express utilizando el puerto definido en las 
 * variables de entorno (env.PORT).
 * 
 * Se utiliza el objeto 'env' (Singleton) para garantizar que la 
 * configuración sea consistente en toda la aplicación.
 */
app.listen(env.PORT, () => {
  console.log(` Servidor corriendo `);
  console.log(` Local: http://localhost:${env.PORT}`);
  console.log(` Documentación: http://localhost:${env.PORT}/api/docs`);
});