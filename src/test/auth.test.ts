import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Auth endpoints", () => {
  const testEmail = `test${Date.now()}${Math.random().toString(36).slice(2)}@mail.com`;

  it("POST /api/auth/register - debe registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: testEmail,
        password: "123456",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("usuario registrado correctamente");
  });

  it("POST /api/auth/login - debe fallar con credenciales incorrectas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "noexiste@mail.com",
        password: "wrongpassword",
      });

    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });
});