const request = require("supertest");
const app = require("../app");
const { expect } = require("chai");
const { getUserByEmail } = require("../models/model_usuario");

jest.mock("../models/model_usuario.js", () => ({
  getUserByEmail: (email, callback) => {
    if (email === "pjuan@gmail.com") {
      callback(null, [
        {
          correo: "pjuan@gmail.com",
          contrasenia: "1234",
        },
      ]);
    } else {
      callback(new Error("Usuario no encontrado"), null);
    }
  },
}));

describe("POST /iniciar-sesion", () => {
  test("Debe iniciar sesion exitosa con credenciales validas", async () => {
    const usuarioLogin = {
      correo: "pjuan@gmail.com",
      contrasenia: "1234",
    };

    const response = await request(app)
      .post("/api/auth/iniciar-sesion")
      .send(usuarioLogin);

    expect(response.statusCode).to.equal(200);
    //expect(response.body.message).toBe("Inicio de sesión exitoso");
  });
});
