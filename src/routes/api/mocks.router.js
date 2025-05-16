import { Router } from "express";

import { createProductsFromMock } from "../../controllers/products.controller.js";
import { createUsersFromMock } from "../../controllers/users.controller.js";

const mocksRouter = Router();

mocksRouter.get("/products/:n", createProductsFromMock );
mocksRouter.get("/users/:n", createUsersFromMock );

export default mocksRouter;