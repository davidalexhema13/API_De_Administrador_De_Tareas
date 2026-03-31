import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt.js";

/**
 * Middleware de seguridad encargado de la validación de tokens JWT.
 * 
 * Actúa como un interceptor en rutas protegidas para garantizar que solo 
 * usuarios autenticados puedan acceder a los recursos.
 * 
 * @param req - Objeto de petición de Express. Se espera el header 'Authorization'.
 * @param res - Objeto de respuesta de Express. Retorna 401 si la validación falla.
 * @param next - Función que cede el control al siguiente middleware o controlador.
 * 
 * @example
 * // En el archivo de rutas:
 * router.get("/tasks", authMiddleware, taskController.getTasks);
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Extraer el encabezado de autorización
  const authHeader = req.headers.authorization;

  // Verificar que el encabezado exista (Evita accesos anónimos)
  if (!authHeader) {
    return res.status(401).json({ error: "Token required" });
  }

  /**
   * El formato estándar es "Bearer <token>". 
   * Usamos split para separar la palabra 'Bearer' del string del token real.
   */
  const token = authHeader.split(" ")[1];

  // Validar que el token tenga el formato correcto después del split
  if (!token) {
    return res.status(401).json({ error: "Token malformed" });
  }

  try {
    /**
     * verifyToken decodifica el JWT usando la 'JWT_SECRET' del entorno.
     * Si el token expiró o la firma es falsa, lanzará un error.
     */
    const decoded = verifyToken(token);

    /**
     * Inyectamos los datos del usuario decodificado (id, email) en el objeto 'req'.
     * Esto permite que los controladores posteriores sepan quién está realizando la acción.
     */
    (req as any).user = decoded;

    // Continuar al controlador de la ruta
    next();
  } catch (error) {
    /**
     * Captura errores de firma inválida, expiración (TokenExpiredError) 
     * o manipulación del token.
     */
    return res.status(401).json({ error: "Invalid token" });
  }
};