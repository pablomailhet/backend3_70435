import { Router } from "express";
import { register, login, current, logout } from "../../controllers/sessions.controller.js";

import { authenticateRegister, authenticateLogin, authenticateJWT } from "../../middlewares/authorization.middleware.js";

const sessionsRouter = Router();

sessionsRouter.post('/register', authenticateRegister, register);
sessionsRouter.post('/login', authenticateLogin, login);
sessionsRouter.get('/current', authenticateJWT, current);
sessionsRouter.get('/logout', authenticateJWT, logout);

export default sessionsRouter;