import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config"; // Importamos la URL del backend
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate
import { Alert } from "react-bootstrap"; // Importamos el componente Alert de Bootstrap

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState(""); // Para almacenar mensajes de error
  const [loading, setLoading] = useState(false); // Para mostrar un indicador de carga

  const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Activamos el indicador de carga

    // Limpiar mensajes de error previos
    setError("");

    axios
      .post(`${API_URL}/iniciar-sesion`, { correo, contrasenia })
      .then((response) => {
        setLoading(false); // Desactivamos el indicador de carga
        if (response.status === 200) {
          // Redirigir a la página de inicio usando navigate
          navigate("/inicio");
        }
      })
      .catch((error) => {
        setLoading(false); // Desactivamos el indicador de carga
        setError("Correo o contraseña incorrectos. Intenta de nuevo."); // Mostrar mensaje de error
        console.error("Error en el login:", error);
      });
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4">Iniciar sesión</h2>

          {/* Mostrar mensaje de error si hay */}
          {error && <Alert variant="danger">{error}</Alert>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo:
              </label>
              <input
                type="email"
                id="correo"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasenia" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                id="contrasenia"
                className="form-control"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                required
              />
            </div>

            {/* Botón de envío con el indicador de carga */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-3 text-center">
            <a href="/registrarse" className="text-decoration-none">
              ¿No tienes cuenta? Regístrate aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
