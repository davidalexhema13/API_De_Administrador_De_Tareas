import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gestión de Tareas",
      version: "1.0.0",
      description: "API RESTful para gestión de tareas personales con autenticación JWT",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/api/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);