import { Router } from "express";
import { getCart, insertProductCart, deleteProductCart, deleteCart, checkout } from "../../controllers/carts.controller.js";
import { authenticateJWT, authorization } from "../../middlewares/authorization.middleware.js";

const cartRouter = Router();

cartRouter.get('/:cid', authenticateJWT, authorization("user"), getCart);
cartRouter.post('/:cid/products/:pid', authenticateJWT, authorization("user"), insertProductCart);
cartRouter.post('/:cid/purchase', authenticateJWT, authorization("user"), checkout);
cartRouter.delete('/:cid/products/:pid', authenticateJWT, authorization("user"), deleteProductCart);
cartRouter.delete('/:cid', authenticateJWT, authorization("user"), deleteCart);

export default cartRouter;