// models/userModel.js
const connection = require("../config/db");

// Función para registrar un nuevo usuario
const registerUser = (name, email, password, sex, age, callback) => {
  const query =
    "INSERT INTO Usuarios (nombre_completo, correo, contrasenia, sexo, edad) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, [name, email, password, sex, age], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Función para verificar si el correo ya está registrado
const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM Usuarios WHERE correo = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = { registerUser, getUserByEmail };
