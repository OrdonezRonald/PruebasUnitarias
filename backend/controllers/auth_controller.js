// controllers/authController.js
const userModel = require("../models/model_usuario");

// Función para registrar un usuario
const register = (req, res) => {
  const { nombre_completo, correo, contrasenia, sexo, edad } = req.body;

  // Verificar si el correo ya está registrado
  userModel.getUserByEmail(correo, (err, existingUser) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    } else {
      // Registrar el usuario en la base de datos
      userModel.registerUser(
        nombre_completo,
        correo,
        contrasenia,
        sexo,
        edad,
        (err, results) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error al registrar el usuario" });
          }

          res.status(201).json({ message: "Usuario registrado exitosamente" });
        }
      );
    }
  });
};

// Función para hacer login
const login = (req, res) => {
  const { correo, contrasenia } = req.body;

  // Verificar si el correo está registrado
  userModel.getUserByEmail(correo, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }

    if (user.length === 0) {
      return res.status(401).json({ error: "Usuario no existe en DB" });
    }

    // Verificar la contraseña
    if (contrasenia !== user[0].contrasenia) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  });
};

module.exports = { register, login };
