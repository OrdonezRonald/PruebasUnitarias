// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

// Ruta para registrar un usuario
router.post("/registro", authController.register);

// Ruta para iniciar sesión
router.post("/iniciar-sesion", authController.login);

module.exports = router;
