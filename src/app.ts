/**
 * Configuración Principal del Servidor Express.
 * 
 * Este archivo centraliza la configuración de middlewares globales, 
 * la exposición de la documentación Swagger y la definición de los 
 * prefijos de rutas para los diferentes módulos de la API.
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import authRoutes from "./api/routes/auth.routes.js";
import taskRoutes from "./api/routes/tasks.routes.js";

// Inicializa las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

/**
 * Middlewares Globales
 */
// Habilita CORS para permitir peticiones desde diferentes dominios (Frontend)
app.use(cors());

// Middleware para parsear cuerpos de peticiones en formato JSON
app.use(express.json());

/**
 * Documentación Interactiva (Swagger)
 * Expone la interfaz de Swagger UI en la ruta /api/docs
 */
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Ruta de salud (Health Check)
 * Útil para verificar que el servidor está arriba sin necesidad de autenticación.
 */
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

/**
 * Definición de Rutas Modulares
 */
// Rutas para Autenticación (Registro, Login)
app.use("/api/auth", authRoutes);

// Rutas para Gestión de Tareas (CRUD Protegido)
app.use("/api/tasks", taskRoutes);

/**
 * Exportación de la instancia de la aplicación para ser iniciada 
 * por el binario de ejecución (ej. server.ts o index.ts).
 */
export default app;