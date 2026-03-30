export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message = "Recurso no encontrado") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class AuthenticationError extends Error {
  statusCode = 401;
  constructor(message = "No autorizado") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class ValidationError extends Error {
  statusCode = 400;
  constructor(message = "Datos inválidos") {
    super(message);
    this.name = "ValidationError";
  }
}