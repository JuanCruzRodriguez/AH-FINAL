import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI_DB = process.env.URI_DB;

export const connectDB = async () => {
  try {
    if (!URI_DB) {
      throw new Error("La variable de entorno URI_DB no está definida");
    }

    await mongoose.connect(URI_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("📌 Conexión correcta con la Base de Datos MongoDB");

  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};
