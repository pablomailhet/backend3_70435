import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../../controllers/products.controller.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import passport from "passport";

import validateProductData from "../../middlewares/validateProductData.middleware.js";

const productRouter = Router();

productRouter.get("/", passport.authenticate("jwt"), getProducts);
productRouter.get("/:pid", passport.authenticate("jwt"), getProduct);
productRouter.post("/", passport.authenticate("jwt"), authorization("admin"), validateProductData, createProduct);
productRouter.put("/:pid", passport.authenticate("jwt"), authorization("admin"), validateProductData, updateProduct);
productRouter.delete("/:pid", passport.authenticate("jwt"), authorization("admin"), deleteProduct);

export default productRouter;