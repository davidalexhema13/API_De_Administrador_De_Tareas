import prisma from "../config/db.js";

export const createTask = async (data: {
  title: string;
  description: string;
  status: string;
  userId: number;
}) => {
  return prisma.task.create({ data });
};

export const getTasksByUser = async (userId: number) => {
  return prisma.task.findMany({ where: { userId } });
};

export const getTaskById = async (id: number) => {
  return prisma.task.findUnique({ where: { id } });
};

export const updateTask = async (id: number, data: any) => {
  return prisma.task.update({ where: { id }, data });
};

export const deleteTask = async (id: number) => {
  return prisma.task.delete({ where: { id } });
};