const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta para comprobar que el servidor API está vivo
app.get("/", (req, res) => {
  res.send("¡El servidor de la API está funcionando!");
});

// La ruta de tu API que necesitamos
app.post("/api/save_data", (req, res) => {
  const data = req.body;
  console.log("Datos recibidos:", data);
  res.status(200).json({ message: "Datos recibidos correctamente" });
});

// Exportamos la app para que Vercel la use
module.exports = app;
