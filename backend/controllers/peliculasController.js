import Pelicula from "../models/peliculasModel.js";

const getPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find({ user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      msg: "Películas obtenidas correctamente",
      data: peliculas
    });
  } catch (error) {
    console.error("Error en getPeliculas:", error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const getPeliculaById = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula)
      return res.status(404).json({ msg: "Película no encontrada" });

    if (pelicula.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "No tienes permiso para acceder a esta película" });

    return res.status(200).json({ msg: "ok", data: pelicula });

  } catch (error) {
    console.error("Error en getPeliculaById:", error);
    return res.status(500).json({ msg: "Error al obtener la película" });
  }
};

const createPelicula = async (req, res) => {
  try {
    const { titulo, genero, anio, descripcion, director } = req.body;

    if (!titulo || !genero || !anio || !descripcion || !director) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios." });
    }

    const pelicula = new Pelicula({
      titulo,
      genero,
      anio,
      descripcion,
      director,
      user: req.user.id,
    });

    const data = await pelicula.save();

    return res.status(201).json({
      msg: "Película creada correctamente",
      data
    });

  } catch (error) {
    console.error("Error en createPelicula:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: "Datos inválidos", error: error.message });
    }

    return res.status(500).json({ msg: "Error al crear la película" });
  }
};

const updatePelicula = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula)
      return res.status(404).json({ msg: "Película no encontrada" });

    if (pelicula.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "No tienes permiso para editar esta película" });

    const camposActualizables = ["titulo", "descripcion", "genero", "director", "anio"];
    const updates = {};

    camposActualizables.forEach(campo => {
      if (req.body[campo] !== undefined) updates[campo] = req.body[campo];
    });

    const data = await Pelicula.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ msg: "Película actualizada", data });

  } catch (error) {
    console.error("Error en updatePelicula:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: "Datos inválidos", error: error.message });
    }

    return res.status(500).json({ msg: "Error al actualizar la película" });
  }
};

const deletePelicula = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula)
      return res.status(404).json({ msg: "Película no encontrada" });

    if (pelicula.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "No tienes permiso para eliminar esta película" });

    await pelicula.deleteOne();

    return res.status(200).json({ msg: "Película eliminada correctamente" });

  } catch (error) {
    console.error("Error en deletePelicula:", error);
    return res.status(500).json({ msg: "Error al eliminar la película" });
  }
};

const toggleFavorito = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula)
      return res.status(404).json({ msg: "Película no encontrada" });

    if (pelicula.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "No tienes permiso para modificar esta película" });

    pelicula.favorita = !pelicula.favorita;

    await pelicula.save();

    return res.status(200).json({
      msg: "Estado de favorito actualizado",
      data: pelicula
    });

  } catch (error) {
    console.error("Error en toggleFavorito:", error);
    return res.status(500).json({ msg: "Error al actualizar favorito" });
  }
};

export {
  getPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
  toggleFavorito,
};
