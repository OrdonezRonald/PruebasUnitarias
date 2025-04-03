import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registrarse" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
