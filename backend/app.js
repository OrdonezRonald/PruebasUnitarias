// uso de librerias
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// importacion de rutas
const authRoutes = require("./routes/auth_route");

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Rutas
app.use("/api/auth", authRoutes);

/*
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
*/
// Solo parar realizar pruebas
module.exports = app;
