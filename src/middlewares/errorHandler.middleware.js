import errors from "../helpers/errors/errors.js";

const errorHandler = (err, req, res, next) => {
    // este es el unico console.log permitido
    // debido a que no se puede obtener con JS la linea que esta teniendo el error
    console.log(err);
    const { method, originalUrl: url } = req;
    const error = err.message || errors.fatal.message;
    const statusCode = err.statusCode || errors.fatal.statusCode;
    res.status(statusCode).json({
        error,
        method,
        url,
    });
};

export default errorHandler;
