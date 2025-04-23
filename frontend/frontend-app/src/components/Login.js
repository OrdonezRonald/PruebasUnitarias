import React, { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false); // ✅ Nuevo estado para el mensaje de éxito

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post(`${API_URL}/iniciar-sesion`, { correo, contrasenia })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setShowSuccess(true); // ✅ Mostramos el mensaje de éxito
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Correo o contraseña incorrectos. Intenta de nuevo.");
        console.error("Error en el login:", error);
      });
  };

  // ✅ Función para confirmar el mensaje y redirigir
  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate("/inicio");
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 position-relative">
      {/* ✅ Alerta flotante de éxito */}
      {showSuccess && (
        <div
          className="position-absolute top-0 start-50 translate-middle-x mt-4"
          style={{ zIndex: 1050, width: "100%", maxWidth: "400px" }}
        >
          <Alert
            variant="success"
            className="d-flex flex-column align-items-center text-center"
          >
            <span className="mb-2">Inicio de sesión exitoso</span>
            <Button variant="success" onClick={handleSuccessOk}>
              OK
            </Button>
          </Alert>
        </div>
      )}

      <div
        className="card shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4">Iniciar sesión</h2>

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

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-3 text-center">
            <a
              href="/registrarse"
              className="text-decoration-none"
              data-testid="link-registro"
            >
              ¿No tienes cuenta? Regístrate aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
