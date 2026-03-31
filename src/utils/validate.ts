import Ajv from "ajv";

/**
 * Instancia de Ajv para la validación de esquemas JSON.
 * Se configura con 'allErrors: true' para retornar todos los fallos de validación de una sola vez.
 */
const ajv = new (Ajv as any)({ allErrors: true });

/** 
 * Configuración de formatos personalizados para campos comunes.
 * Ajv v8+ requiere definiciones manuales o el paquete 'ajv-formats'.
 */
ajv.addFormat("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
ajv.addFormat("date-time", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);

/**
 * Valida un objeto de datos contra un esquema JSON específico.
 * 
 * @param schema - El esquema de validación (registerSchema, loginSchema, etc.)
 * @param data - Los datos provenientes de req.body o cualquier otra fuente.
 * @throws {Error} Lanza un error con los mensajes de validación concatenados si los datos no cumplen el esquema.
 */
export const validateSchema = (schema: object, data: unknown) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  
  if (!valid) {
    // Mapea los errores para entregar un mensaje legible al cliente
    const message = validate.errors?.map((e: any) => `${e.instancePath.replace('/','')} ${e.message}`).join(", ");
    throw new Error(message);
  }
};

/**
 * Esquema para el registro de nuevos usuarios.
 * Requiere nombre, email válido y contraseña de al menos 6 caracteres.
 */
export const registerSchema = {
  type: "object",
  properties: {
    name:     { type: "string", minLength: 1, errorMessage: "El nombre es obligatorio" },
    email:    { type: "string", format: "email", errorMessage: "Formato de email inválido" },
    password: { type: "string", minLength: 6, errorMessage: "La contraseña debe tener al menos 6 caracteres" },
  },
  required: ["name", "email", "password"],
  additionalProperties: false, // Bloquea campos no definidos en el esquema (Seguridad)
};

/**
 * Esquema para la autenticación de usuarios (Login).
 */
export const loginSchema = {
  type: "object",
  properties: {
    email:    { type: "string", format: "email" },
    password: { type: "string", minLength: 1 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

/**
 * Esquema para la creación y actualización de tareas.
 * El campo 'status' está restringido a valores predefinidos mediante un enum.
 */
export const taskSchema = {
  type: "object",
  properties: {
    title:             { type: "string", minLength: 1 },
    description:       { type: "string" },
    status:            { type: "string", enum: ["pendiente", "en curso", "completada"] },
    fecha_vencimiento: { type: "string", format: "date-time" },
  },
  required: ["title"],
};