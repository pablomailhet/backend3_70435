import __dirname from "../path.js";
import swaggerJsDoc from "swagger-jsdoc";

const opts = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "PM Commerce 70435",
            description: "Documentación de la API de PM Commerce 70435",
        },
    },
    apis: [__dirname + "/docs/*.yaml"],
};
const swaggerSpecs = swaggerJsDoc(opts);

export default swaggerSpecs;