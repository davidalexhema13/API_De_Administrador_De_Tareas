import * as repo from "../persistencia/task.repository.js";

export const createTaskService = async (data: any, userId: number) => {
  return repo.createTask({
    title: data.title,
    description: data.description,
    status: "pendiente",
    userId,
  });
};

export const getTasksService = async (userId: number) => {
  return repo.getTasksByUser(userId);
};

export const getTaskService = async (id: number, userId: number) => {
  const task = await repo.getTaskById(id);

  if (!task || task.userId !== userId) {
    throw new Error("Task not found");
  }

  return task;
};

export const updateTaskService = async (id: number, data: any, userId: number) => {
  const task = await repo.getTaskById(id);

  if (!task || task.userId !== userId) {
    throw new Error("Task not found");
  }

  return repo.updateTask(id, data);
};

export const deleteTaskService = async (id: number, userId: number) => {
  const task = await repo.getTaskById(id);

  if (!task || task.userId !== userId) {
    throw new Error("Task not found");
  }

  await repo.deleteTask(id);
  return { message: "Task deleted" };
};