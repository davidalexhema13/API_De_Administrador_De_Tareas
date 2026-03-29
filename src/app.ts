import express from "express";
import cors from "cors"; 
import authRoutes from "./api/routes/auth.routes.js"; 

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("api funcionando ");
});


app.use("/api/auth", authRoutes);

export default app;