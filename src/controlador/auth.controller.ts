import type { Request, Response } from "express";
import { registerUser, loginUser } from "../servicios/auth.service.js";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos o email ya registrado
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión y obtiene un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve el token
 *       401:
 *         description: Credenciales inválidas
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};