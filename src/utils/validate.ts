import Ajv from "ajv";

const ajv = new (Ajv as any)({ allErrors: true });

ajv.addFormat("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
ajv.addFormat("date-time", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);

export const validateSchema = (schema: object, data: unknown) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    const message = validate.errors?.map((e: any) => e.message).join(", ");
    throw new Error(message);
  }
};

export const registerSchema = {
  type: "object",
  properties: {
    name:     { type: "string", minLength: 1 },
    email:    { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};

export const loginSchema = {
  type: "object",
  properties: {
    email:    { type: "string", format: "email" },
    password: { type: "string", minLength: 1 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export const taskSchema = {
  type: "object",
  properties: {
    title:             { type: "string", minLength: 1 },
    description:       { type: "string" },
    status:            { type: "string", enum: ["pendiente", "en curso", "completada"] },
    fecha_vencimiento: { type: "string", format: "date-time" },
  },
  required: ["title"],
  additionalProperties: false,
};