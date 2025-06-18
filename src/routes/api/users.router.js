import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../../controllers/users.controller.js";
import { authenticateJWT, authorization } from "../../middlewares/authorization.middleware.js";

import validateUserData from "../../middlewares/validateUserData.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticateJWT, authorization("admin"), getUsers);
userRouter.get("/:uid", authenticateJWT, authorization("admin"), getUser);
userRouter.post("/", authenticateJWT, authorization("admin"), validateUserData, createUser);
userRouter.put("/:uid", authenticateJWT, authorization("admin"), validateUserData, updateUser);
userRouter.delete("/:uid", authenticateJWT, authorization("admin"), deleteUser);

export default userRouter;