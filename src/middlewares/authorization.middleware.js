export const authorization = (rol) => {
    return async (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ status: "error", message: "Usuario no autenticado" });
        if (req.user.rol != rol)
            return res.status(403).json({ status: "error", message: "Usuario no autorizado" });
        next();
    }
}