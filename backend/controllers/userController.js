import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ msg: "Usuarios obtenidos", data: users });
    } catch (error) {
        console.error("Error en getUsers:", error);
        res.status(500).json({ msg: "Error interno al obtener usuarios" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Faltan campos obligatorios" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "USER"
        });

        await newUser.save();

        res.status(201).json({ msg: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error en registerUser:", error);
        res.status(500).json({ msg: "Error al registrar el usuario" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Faltan campos obligatorios" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.status(200).json({
            msg: "Login exitoso",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error en loginUser:", error);
        res.status(500).json({ msg: "Error al iniciar sesión" });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json({ msg: "Perfil obtenido", user });
    } catch (error) {
        console.error("Error en getProfile:", error);
        res.status(500).json({ msg: "Error al obtener el perfil" });
    }
};

const updateUser = async (req, res) => {
    try {
        const updates = {};

        if (req.body.name) updates.name = req.body.name;
        if (req.body.email) updates.email = req.body.email;

        if (req.body.role) {
            if (!["USER", "ADMIN"].includes(req.body.role)) {
                return res.status(400).json({ msg: "Rol inválido" });
            }
            updates.role = req.body.role;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json({ msg: "Usuario actualizado", user: updatedUser });
    } catch (error) {
        console.error("Error en updateUser:", error);
        res.status(500).json({ msg: "Error al actualizar el usuario" });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            return res.status(400).json({ msg: "No puedes eliminarte a ti mismo" });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error en deleteUser:", error);
        res.status(500).json({ msg: "Error al eliminar el usuario" });
    }
};

export {
    getUsers,
    registerUser,
    loginUser,
    getProfile,
    updateUser,
    deleteUser,
};
