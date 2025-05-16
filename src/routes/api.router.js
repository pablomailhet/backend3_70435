import { Router } from "express";

import sessionsRouter from "./api/sessions.router.js";
import userRouter from "./api/users.router.js";
import productRouter from "./api/products.router.js";
import cartRouter from "./api/carts.router.js";

import mocksRouter from "./api/mocks.router.js";

const apiRouter = Router();

apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/carts", cartRouter);

apiRouter.use("/mocks", mocksRouter);

export default apiRouter;