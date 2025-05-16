import { Router } from "express";
import { getCart, createCart, insertProductCart, deleteProductCart, deleteCart, checkout } from "../../controllers/carts.controller.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import passport from "passport";

const cartRouter = Router();

cartRouter.get('/:cid', passport.authenticate("jwt"), authorization("user"), getCart);
cartRouter.post('/', passport.authenticate("jwt"), authorization("user"), createCart);
cartRouter.post('/:cid/products/:pid', passport.authenticate("jwt"), authorization("user"), insertProductCart);
cartRouter.post('/:cid/purchase', passport.authenticate("jwt"), authorization("user"), checkout);
cartRouter.delete('/:cid/products/:pid', passport.authenticate("jwt"), authorization("user"), deleteProductCart);
cartRouter.delete('/:cid', passport.authenticate("jwt"), authorization("user"), deleteCart);

export default cartRouter;