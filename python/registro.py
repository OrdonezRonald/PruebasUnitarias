import pytest
from unittest.mock import patch
from app import app  # Importamos la aplicación de Flask/FastAPI, dependiendo de tu framework

# Mock de la función 'registerUser' para simular un registro exitoso
# y 'getUserByEmail' para simular la verificación del correo
@pytest.fixture
def mock_db():
    with patch("models.model_usuario.registerUser") as register_mock, \
         patch("models.model_usuario.getUserByEmail") as get_user_mock:
        
        # Definir el comportamiento de las funciones mockeadas
        register_mock.return_value = (None, {"insertId": 1})  # Simulamos un registro exitoso
        get_user_mock.side_effect = lambda email, callback: (
            callback(None, [{"correo": email}]) if email == "luis@example.com" else callback(None, [])
        )  # Simula que el correo ya está registrado
        
        yield register_mock, get_user_mock

# Test para registrar un usuario exitosamente
def test_register_user_success(mock_db):
    register_mock, _ = mock_db

    nuevo_usuario = {
        "nombre_completo": "Luis Sanchez",
        "correo": "lsanchez@example.com",
        "contrasenia": "123456",
        "sexo": "M",
        "edad": 31
    }

    # Simulamos la petición POST para registrar el usuario
    with app.test_client() as client:
        response = client.post("/api/auth/registro", json=nuevo_usuario)

    # Verificamos que el estado de la respuesta sea 201 y el mensaje esperado
    assert response.status_code == 201
    assert response.json == {"message": "Usuario registrado exitosamente"}

    # Verificamos que el mock de registro fue llamado
    register_mock.assert_called_with(
        nuevo_usuario["nombre_completo"],
        nuevo_usuario["correo"],
        nuevo_usuario["contrasenia"],
        nuevo_usuario["sexo"],
        nuevo_usuario["edad"],
        any
    )

# Test para verificar que no se pueda registrar un correo ya existente
def test_register_user_email_exists(mock_db):
    _, get_user_mock = mock_db

    nuevo_usuario = {
        "nombre_completo": "Carlos Ramirez",
        "correo": "luis@example.com",  # Correo ya registrado
        "contrasenia": "123456",
        "sexo": "M",
        "edad": 29
    }

    # Simulamos la petición POST para registrar el usuario
    with app.test_client() as client:
        response = client.post("/api/auth/registro", json=nuevo_usuario)

    # Verificamos que el estado de la respuesta sea 400 y el mensaje de error esperado
    assert response.status_code == 400
    assert response.json["error"] == "El correo ya está registrado"

    # Verificamos que se llamó a la función de verificar si el correo ya existe
    get_user_mock.assert_called_with(nuevo_usuario["correo"], any)
