import Serie from "../models/seriesModel.js";

const getSeries = async (req, res) => {
  try {
    const series = await Serie.find({ user: req.user.id });
    res.status(200).json({ msg: "ok", data: series });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se pudieron obtener las series" });
  }
};

const getSerieById = async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    if (!serie) return res.status(404).json({ msg: "Serie no encontrada" });

    if (serie.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "No tienes permiso para ver esta serie" });

    res.status(200).json({ msg: "ok", data: serie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al buscar la serie" });
  }
};

const createSerie = async (req, res) => {
  try {
    const { titulo, descripcion, genero, anio, temporadas } = req.body;

    if (!titulo || !descripcion || !genero || !anio || !temporadas) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const serie = new Serie({
      titulo,
      descripcion,
      genero,
      anio,
      temporadas,
      favorita: false,
      user: req.user.id,
    });

    const data = await serie.save();
    res.status(201).json({ msg: "Serie creada correctamente", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "No se pudo crear la serie" });
  }
};

const updateSerie = async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    if (!serie) return res.status(404).json({ msg: "Serie no encontrada" });

    if (serie.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "No tienes permiso para editar esta serie" });

    const data = await Serie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ msg: "Serie actualizada", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar la serie" });
  }
};

const deleteSerie = async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    if (!serie) return res.status(404).json({ msg: "Serie no encontrada" });

    if (serie.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "No tienes permiso para eliminar esta serie" });

    await serie.deleteOne();
    res.status(200).json({ msg: "Serie eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar la serie" });
  }
};

const toggleFavorito = async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    if (!serie) return res.status(404).json({ msg: "Serie no encontrada" });

    if (serie.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "No tienes permiso para editar esta serie" });

    serie.favorita = !serie.favorita;
    await serie.save();

    res.status(200).json({ msg: "Favorito actualizado", data: serie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar favorito" });
  }
};

export { getSeries, getSerieById, createSerie, updateSerie, deleteSerie, toggleFavorito };
