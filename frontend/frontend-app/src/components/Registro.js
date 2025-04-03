import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config"; // Importamos la URL del backend
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate
import { Alert } from "react-bootstrap"; // Importamos el componente de alerta de react-bootstrap

const Registro = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de error o éxito

  const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

  const handleRegistro = (e) => {
    e.preventDefault();

    const usuario = {
      nombre_completo: nombreCompleto,
      correo,
      contrasenia,
      sexo,
      edad,
    };

    axios
      .post(`${API_URL}/registro`, usuario)
      .then((response) => {
        if (response.status === 201) {
          setMensaje("Usuario registrado correctamente");
          setTimeout(() => navigate("/login"), 2000); // Redirigir a login después de 2 segundos
        }
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        setMensaje(
          "Hubo un error al registrar al usuario. Inténtalo de nuevo."
        );
      });
  };

  return (
    <div className="registro-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Registrarse</h2>
        {mensaje && (
          <Alert
            variant={mensaje.includes("correctamente") ? "success" : "danger"}
          >
            {mensaje}
          </Alert>
        )}
        <form onSubmit={handleRegistro}>
          <div className="mb-3">
            <label>Nombre Completo:</label>
            <input
              type="text"
              className="form-control"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Correo:</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Sexo:</label>
            <select
              className="form-select"
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              required
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Edad:</label>
            <input
              type="number"
              className="form-control"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Registrar
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/">¿Ya tienes cuenta? Inicia sesión aquí</a>
        </div>
      </div>
    </div>
  );
};

export default Registro;
