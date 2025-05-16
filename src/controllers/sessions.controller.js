import { generateToken } from '../helpers/jwt.helper.js';

export const login = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(400).json({ status: "error", message: "Usuario o contraseña incorrecta" });
        }

        req.session.user = {
            _id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            rol: req.user.rol
        };

        return res.status(200).cookie('coderSession', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).json({ status: "success", message: "Usuario logueado correctamente" });

    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const register = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ status: "error", message: "Email y contraseña son obligatorios" });
        }

        return res.status(201).json({ status: "success", message: "Usuario registrado correctamente" });
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const githubLogin = (req, res) => {
    try {

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            rol: req.user.rol
        };

        res.status(200).cookie('coderSession', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).redirect('/api/products');
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const viewRegister = (req, res) => {
    res.status(200).render('templates/register', {
        title: "Registro de Usuarios",
        url_js: "/js/register.js",
        url_css: "/css/main.css"
    });
}

export const viewLogin = (req, res) => {
    res.status(200).render('templates/login', {
        title: "Inicio de Sesion de Usuarios",
        url_js: "/js/login.js",
        url_css: "/css/main.css"
    });
}