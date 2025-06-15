import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../../controllers/users.controller.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import passport from "passport";

import validateUserData from "../../middlewares/validateUserData.middleware.js";

const userRouter = Router();

userRouter.get("/", passport.authenticate("jwt"), authorization("admin"), getUsers);
userRouter.get("/:uid", passport.authenticate("jwt"), authorization("admin"), getUser);
userRouter.post("/", passport.authenticate("jwt"), authorization("admin"), validateUserData, createUser);
userRouter.put("/:uid", passport.authenticate("jwt"), authorization("admin"), validateUserData, updateUser);
userRouter.delete("/:uid", passport.authenticate("jwt"), authorization("admin"), deleteUser);

export default userRouter;