import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import authRoutes from "./api/routes/auth.routes.js";
import taskRoutes from "./api/routes/tasks.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;