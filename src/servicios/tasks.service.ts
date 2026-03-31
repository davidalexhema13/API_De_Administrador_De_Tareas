import * as repo from "../persistencia/task.repository.js";

/**
 * Crea una nueva tarea asociada al usuario autenticado.
 * @param data - Datos de la tarea (title, description, status, fecha_vencimiento)
 * @param userId - ID del usuario propietario
 * @returns La tarea creada
 */
export const createTaskService = async (data: any, userId: number) => {
  return repo.createTask({
    title: data.title,
    description: data.description,
    status: data.status ?? "pendiente",
    fecha_vencimiento: data.fecha_vencimiento ? new Date(data.fecha_vencimiento) : null,
    userId,
  });
};

/**
 * Obtiene todas las tareas del usuario autenticado.
 * @param userId - ID del usuario
 * @returns Lista de tareas del usuario
 */
export const getTasksService = async (userId: number) => {
  return repo.getTasksByUser(userId);
};

/**
 * Obtiene una tarea específica verificando que pertenezca al usuario.
 * @param id - ID de la tarea
 * @param userId - ID del usuario autenticado
 * @returns La tarea encontrada
 * @throws Error si la tarea no existe o no pertenece al usuario
 */
export const getTaskService = async (id: number, userId: number) => {
  const task = await repo.getTaskById(id);

  if (!task || task.userId !== userId) {
    throw new Error("Task not found");
  }

  return task;
};

/**
 * Actualiza una tarea verificando que pertenezca al usuario.
 * @param id - ID de la tarea
 * @param data - Datos a actualizar
 * @param userId - ID del usuario autenticado
 * @returns La tarea actualizada
 * @throws Error si la tarea no existe o no pertenece al usuario
 */
export const updateTaskService = async (id: number, data: any, userId: number) => {
  const task = await repo.getTaskById(id);

  if (!task || task.userId !== userId) {
    throw new Error("Task not found");
  }

  return repo.updateTask(id, data);
};

/**
 * Elimina una tarea verificando que pertenezca al usuario.
 * @param id - ID de la tarea
 * @param userId - ID del usuario autenticado
 * @returns Mensaje de confirmación
 * @throws Error si la tarea no existe o no pertenece al usuario
 */
export const deleteTaskService = async (id: number, userId: number) => {
  const task = await repo.getTaskById(id);

  if (!task || task.userId !== userId) {
    throw new Error("Task not found");
  }

  await repo.deleteTask(id);
  return { message: "Task deleted" };
};