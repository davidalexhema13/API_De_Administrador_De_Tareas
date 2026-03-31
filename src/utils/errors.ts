/**
 * Error personalizado para recursos no encontrados (404).
 * Se utiliza cuando un ID de tarea o usuario no existe en la base de datos de Neon.
 */
export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message = "Recurso no encontrado") {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Error de autenticación (401).
 * Se lanza cuando las credenciales son incorrectas o el token JWT ha expirado.
 */
export class AuthenticationError extends Error {
  statusCode = 401;
  constructor(message = "No autorizado") {
    super(message);
    this.name = "AuthenticationError";
  }
}

/**
 * Error de validación de datos (400).
 * Ideal para cuando los datos enviados no cumplen con el esquema de Ajv 
 * o faltan campos obligatorios.
 */
export class ValidationError extends Error {
  statusCode = 400;
  constructor(message = "Datos inválidos") {
    super(message);
    this.name = "ValidationError";
  }
}