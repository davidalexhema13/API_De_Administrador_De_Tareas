import swaggerJsdoc from "swagger-jsdoc";

/**
 * Configuración de Swagger (OpenAPI 3.0).
 * 
 * Este archivo define los metadatos de la API y la estrategia de seguridad
 * global para la documentación interactiva.
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gestión de Tareas",
      version: "1.0.0",
      description: "API RESTful para gestión de tareas personales con autenticación JWT",
      contact: {
        name: "Alexander",
        // Puedes agregar tu email o github aquí
      }
    },
    /**
     * Definición de componentes globales.
     * Aquí configuramos el esquema de seguridad para que Swagger permita 
     * enviar el token JWT en el header 'Authorization'.
     */
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Introduce el token JWT obtenido en el login para acceder a las rutas protegidas."
        },
      },
    },
    /**
     * Aplica la seguridad de forma global a todos los endpoints 
     * documentados en la interfaz de Swagger.
     */
    security: [{ bearerAuth: [] }],
  },
  /**
   * Rutas de los archivos que contienen las anotaciones JSDoc (@swagger).
   * Swagger leerá los archivos en 'src/api/routes/' para generar la documentación.
   */
  apis: ["./src/api/routes/*.ts"],
};

/**
 * Objeto de especificación de Swagger generado a partir de las opciones.
 * Se utiliza para alimentar el middleware 'swagger-ui-express' en el servidor.
 */
export const swaggerSpec = swaggerJsdoc(options);