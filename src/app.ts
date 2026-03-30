import express from "express";
import cors from "cors"; 
import dotenv from "dotenv";
import authRoutes from "./api/routes/auth.routes.js"; 
import taskRoutes from "./api/routes/tasks.routes.js";

dotenv.config(); // 1. Cargar variables de entorno primero

const app = express();

// 2. MIDDLEWARES GLOBALES (Configuración de la "tubería")
app.use(cors());
app.use(express.json()); // <--- Ahora sí, esto procesará el body ANTES de las rutas

// 3. RUTAS
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); // <--- Ahora esta ruta sí recibirá el body procesado

export default app;