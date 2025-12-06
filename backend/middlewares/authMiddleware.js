import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "Acceso denegado. Token no enviado o con formato incorrecto."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
        };

        return next();

    } catch (error) {
        console.error("Error al verificar token:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                msg: "El token ha expirado. Inicia sesión nuevamente."
            });
        }

        return res.status(403).json({
            msg: "Token inválido o manipulado."
        });
    }
};

export default verifyToken;
