import { type Request, type Response } from "express";
import * as service from "../servicios/tasks.service.js";
import { validateSchema, taskSchema } from "../utils/validate.js";

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gestión de tareas personales
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       401:
 *         description: No autorizado
 */
export const createTask = async (req: any, res: Response) => {
  try {
    validateSchema(taskSchema, req.body);
    const userId = req.user.userId;
    const task = await service.createTaskService(req.body, userId);
    res.status(201).json(task);
  } catch (e: any) {
    res.status(e.statusCode ?? 400).json({ error: e.message });
  }
};

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas del usuario autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida
 */
export const getTasks = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const tasks = await service.getTasksService(userId);
    res.json(tasks);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea específica por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de la tarea
 *       404:
 *         description: Tarea no encontrada
 */
export const getTask = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const task = await service.getTaskService(Number(req.params.id), userId);
    res.json(task);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */
export const updateTask = async (req: any, res: Response) => {
  try {
    validateSchema(taskSchema, req.body);
    const userId = req.user.userId;
    const task = await service.updateTaskService(Number(req.params.id), req.body, userId);
    res.json(task);
  } catch (e: any) {
    res.status(e.statusCode ?? 404).json({ error: e.message });
  }
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 */
export const deleteTask = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const result = await service.deleteTaskService(Number(req.params.id), userId);
    res.json(result);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
};