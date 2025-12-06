import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  director: { type: String, required: true },
  anio: { type: Number, required: true },
  genero: { type: String, required: true },
  favorita: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true
});

export default mongoose.model("Pelicula", peliculaSchema);
