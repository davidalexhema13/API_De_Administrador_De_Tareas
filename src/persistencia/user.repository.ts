import prisma from "../config/db.js";

/*
 * Crea un nuevo usuario en la base de datos.
 * @param data - Datos del usuario (name, email, password hasheado)
 * @returns El usuario creado
 */
export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return prisma.user.create({ data });
};

/*
 * Busca un usuario por su email.
 * @param email - Email del usuario a buscar
 * @returns El usuario encontrado o null
 */
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};