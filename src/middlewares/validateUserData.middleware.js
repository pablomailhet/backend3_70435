import { body, validationResult } from "express-validator";

const validateUserData = [

    body("first_name")
        .exists().withMessage("first_name es requerido.")
        .isString().withMessage("first_name debe ser un texto.")
        .trim()
        .isLength({ min: 3 }).withMessage("first_name debe tener al menos 3 caracteres.")
        .notEmpty().withMessage("first_name no debe estar vacío."),

    body("last_name")
        .exists().withMessage("last_name es requerido.")
        .isString().withMessage("last_name debe ser un texto.")
        .trim()
        .isLength({ min: 3 }).withMessage("last_name debe tener al menos 3 caracteres.")
        .notEmpty().withMessage("last_name no debe estar vacío."),

    body("email")
        .exists().withMessage("email es requerido.")
        .isString().withMessage("email debe ser un texto.")
        .trim()
        .notEmpty().withMessage("email no debe estar vacío.")
        .isEmail().withMessage("email debe tener un formato válido.")
        .normalizeEmail(),

    body("password")
        .exists().withMessage("password es requerido.")
        .isString().withMessage("password debe ser un texto.")
        .trim()
        .notEmpty().withMessage("password no debe estar vacío.")
        .isLength({ min: 4 }).withMessage("password debe tener al menos 4 caracteres.")
        .matches(/\d/).withMessage("password debe contener al menos un número."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //const messages = errors.array().map(err => err.msg).join('\n');
            const messages = errors.array()[0].msg;
            return res.status(400).json({ status: "error", message: messages });
        }
        next();
    }

];

export default validateUserData;
