import passport from "passport";

export const authorization = (rol) => {
    return async (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ status: "error", message: "Usuario no autenticado" });
        if (req.user.rol != rol)
            return res.status(403).json({ status: "error", message: "Usuario no autorizado" });
        next();
    }
}

export const authenticateJWT = (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Usuario no autenticado",
            });
        }

        req.user = user;
        next();
    })(req, res, next);
}

export const authenticateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Bad Request"
        });
    }
    passport.authenticate('login', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: info?.message || 'Credenciales inválidas'
            });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            next();
        });
    })(req, res, next);
};

export const authenticateRegister = (req, res, next) => {

    const {first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Bad Request"
        });
    }

    passport.authenticate('register', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: info?.message || 'Registro fallido',
            });
        }
        req.user = user;
        next();
    })(req, res, next);

};