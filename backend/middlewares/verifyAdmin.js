const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            msg: "No autenticado. Debes iniciar sesión."
        });
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            msg: "Acceso denegado. Se requieren permisos de administrador."
        });
    }

    next();
};

export default verifyAdmin;
