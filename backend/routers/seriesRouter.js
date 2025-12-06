import express from "express";
import {
    getSeries,
    getSerieById,
    createSerie,
    updateSerie,
    deleteSerie,
    toggleFavorito
} from "../controllers/seriesController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getSeries);
router.get("/:id", getSerieById);
router.post("/", createSerie);
router.put("/:id", updateSerie);
router.delete("/:id", deleteSerie);

router.patch("/:id/favorito", toggleFavorito);

export default router;
