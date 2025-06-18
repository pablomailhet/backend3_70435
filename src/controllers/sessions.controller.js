import { generateToken } from '../helpers/jwt.helper.js';

import userModel from "../models/users.model.js";

export const login = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(400).json({ status: "error", message: "Usuario o contraseña incorrecta" });
        }

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

        return res.status(201).json({ status: "success", message: "User added", _id: req.user._id });
    }
    catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const githubLogin = (req, res) => {
    try {
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

export const current = async (req, res) => {

    try {

        const user = await userModel.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(401).json({ status: "error", message: "Credenciales inválidas" });
        }

        res.status(200).json({
            status: "success",
            user: user
        });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }


}

export const logout = (req, res) => {
    res.clearCookie('coderSession', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict' // o 'lax' dependiendo de tu configuración
    });
    return res.status(200).json({
        status: 'success',
        message: 'Sesión cerrada correctamente'
    });
};