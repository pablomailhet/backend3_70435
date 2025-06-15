import errors from "../helpers/errors/errors.js";

const errorHandler = (err, req, res, next) => {
    // este es el unico console.log permitido
    // debido a que no se puede obtener con JS la linea que esta teniendo el error
    console.log(err);

    const { method, originalUrl: url } = req;

    let message = err.message || errors.fatal.message;
    let statusCode = err.statusCode || errors.fatal.statusCode;

    if (err.name === 'ValidationError') {
        // Extraer mensajes específicos de los campos con errores
        const errores = Object.values(err.errors).map((e) => ({
            campo: e.path,
            mensaje: e.message
        }));
        statusCode = errors.client.statusCode;
        message = errors.client.message;
    }

    const mongoError = err.cause;
    if (mongoError?.code === 11000) {
        const campo = Object.keys(mongoError.keyPattern)[0];
        const valor = mongoError.keyValue[campo];
        statusCode = 409;
        message = `El valor del campo '${campo}' ya existe.`;
    }

    res.status(statusCode).json({
        message: message,
        method,
        url,
    });

};

export default errorHandler;
