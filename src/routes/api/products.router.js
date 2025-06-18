import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../../controllers/products.controller.js";

import {authenticateJWT, authorization } from "../../middlewares/authorization.middleware.js";
import validateProductData from "../../middlewares/validateProductData.middleware.js";

const productRouter = Router();

productRouter.get("/", authenticateJWT, getProducts);
productRouter.get("/:pid", authenticateJWT, getProduct);
productRouter.post("/", authenticateJWT, authorization("admin"), validateProductData, createProduct);
productRouter.put("/:pid", authenticateJWT, authorization("admin"), validateProductData, updateProduct);
productRouter.delete("/:pid", authenticateJWT, authorization("admin"), deleteProduct);

export default productRouter;