import prisma from "../config/db.js";

/**
 * Crea una nueva tarea en la base de datos.
 * @param data - Datos de la tarea
 * @returns La tarea creada
 */
export const createTask = async (data: {
  title: string;
  description?: string;
  status: string;
  fecha_vencimiento?: Date | null;
  userId: number;
}) => {
  return prisma.task.create({ data });
};

/**
 * Obtiene todas las tareas de un usuario.
 * @param userId - ID del usuario
 * @returns Lista de tareas
 */
export const getTasksByUser = async (userId: number) => {
  return prisma.task.findMany({ where: { userId } });
};

/**
 * Busca una tarea por su ID.
 * @param id - ID de la tarea
 * @returns La tarea encontrada o null
 */
export const getTaskById = async (id: number) => {
  return prisma.task.findUnique({ where: { id } });
};

/**
 * Actualiza una tarea existente.
 * @param id - ID de la tarea
 * @param data - Datos a actualizar
 * @returns La tarea actualizada
 */
export const updateTask = async (id: number, data: any) => {
  return prisma.task.update({ where: { id }, data });
};

/**
 * Elimina una tarea por su ID.
 * @param id - ID de la tarea
 */
export const deleteTask = async (id: number) => {
  return prisma.task.delete({ where: { id } });
};