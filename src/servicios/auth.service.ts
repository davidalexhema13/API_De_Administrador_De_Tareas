import bcrypt from "bcrypt";

import { createUser, FindUserbyEmail  } from "../persistencia/user.repository.js";

import { generarToken } from "../utils/jwt.js";

export const registerUser = async (name: string, email: string, password: string) => {
  
  const existingUser = await FindUserbyEmail (email);

  if (existingUser) {
    throw new Error("Usario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  };

  
  await createUser(newUser);

  return { message: "usuario registrado correctamente" };
};

export const loginUser = async (email: string, password: string) => {
  const user = await FindUserbyEmail (email);

  if (!user) {
    throw new Error("credenciales invalidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("credeciales invalidas");
  }

  
  const token = generarToken({ userId: user.id });

  return { token };
};