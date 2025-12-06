import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import routerAPI from "./routers/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

routerAPI(app);

app.use("/", express.static("public"));

app.get("/api", (req, res) => {
  res.json({ msg: "API funcionando correctamente" });
});

app.use((err, req, res, next) => {
  console.error("🔥 Error en el servidor:", err);

  res.status(500).json({
    msg: "Error interno en el servidor",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
