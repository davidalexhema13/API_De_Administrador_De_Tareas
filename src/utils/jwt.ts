import jwt from "jsonwebtoken";

const Secret = process.env.JWT_SECRET || "default_secret";

/**
 * Genera un token JWT firmado con el payload dado.
 * @param payload - Datos a incluir en el token (ej. userId)
 * @returns Token JWT con expiración de 2 horas
 */
export const generarToken = (payload: any) => {
  return jwt.sign(payload, Secret, { expiresIn: "2h" });
};

/**
 * Verifica y decodifica un token JWT.
 * @param Token - Token JWT a verificar
 * @returns Payload decodificado si el token es válido
 * @throws Error si el token es inválido o ha expirado
 */
export const verifyToken = (Token: string) => {
  return jwt.verify(Token, Secret);
};