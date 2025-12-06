import express from "express";

import {
    getUsers,
    registerUser,
    loginUser,
    getProfile,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

import verifyToken from "../middlewares/authMiddleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.get("/", verifyToken, verifyAdmin, getUsers);
router.put("/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
