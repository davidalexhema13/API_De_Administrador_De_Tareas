import { type Request, type Response } from "express";
import * as service from "../servicios/tasks.service.js";
import { validateSchema, taskSchema } from "../utils/validate.js";

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

export const getTasks = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const tasks = await service.getTasksService(userId);
    res.json(tasks);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const getTask = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const task = await service.getTaskService(Number(req.params.id), userId);
    res.json(task);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
};

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

export const deleteTask = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const result = await service.deleteTaskService(Number(req.params.id), userId);
    res.json(result);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
};