import express from "express";
import {
  getPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
  toggleFavorito
} from "../controllers/peliculasController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);
router.get("/", getPeliculas);
router.get("/:id", getPeliculaById);
router.post("/", createPelicula);
router.put("/:id", updatePelicula);
router.delete("/:id", deletePelicula);
router.patch("/:id/favorito", toggleFavorito);

export default router;
