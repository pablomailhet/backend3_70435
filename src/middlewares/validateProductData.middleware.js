import { body, validationResult } from "express-validator";

const validateProductData = [

    body("title")
        .exists().withMessage("Title es requerido.")
        .isString().withMessage("Title debe ser un texto.")
        .trim()
        .isLength({ min: 5 }).withMessage("Title debe tener al menos 5 caracteres.")
        .notEmpty().withMessage("Title no debe estar vacío."),

    body("description")
        .exists().withMessage("Description es requerido.")
        .isString().withMessage("Description debe ser un texto.")
        .trim()
        .isLength({ min: 10 }).withMessage("Description debe tener al menos 10 caracteres.")
        .notEmpty().withMessage("Description no debe estar vacío."),

    body("code")
        .exists().withMessage("Code es requerido.")
        .isString().withMessage("Code debe ser un texto.")
        .trim()
        .isLength({ min: 3 }).withMessage("Code debe tener al menos 3 caracteres.")
        .notEmpty().withMessage("Code no debe estar vacío."),

    body("price")
        .exists().withMessage('Price es requerido.')
        .isFloat({ gt: 0 }).withMessage('Price debe ser un número mayor que 0.')
        .toFloat(),

    body("stock")
        .exists().withMessage('Stock es requerido.')
        .isInt({ gt: 0 }).withMessage('Stock debe ser un número entero mayor que 0.')
        .toInt(),

    body("category")
        .exists().withMessage("Category es requerido.")
        .isString().withMessage("Category debe ser un texto.")
        .trim()
        .isLength({ min: 3 }).withMessage("Category debe tener al menos 3 caracteres.")
        .notEmpty().withMessage("Category no debe estar vacío."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //const messages = errors.array().map(err => err.msg).join('\n');
            //const messages = errors.array()[0].msg;
            return res.status(400).json({ status: "error", message: errors.array() });
        }
        next();
    }

];

export default validateProductData;
