import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../persistencia/user.repository.js";
import { generarToken } from "../utils/jwt.js";

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser({ name, email, password: hashedPassword });

  return { message: "usuario registrado correctamente" };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }

  const token = generarToken({ userId: user.id });

  return { token };
};