import { Router } from "express";
import { AuthController } from "./authController";
import { AuthMiddleware } from "./authMiddleware";

const router: Router = Router();
const authController: AuthController = new AuthController()
const authMiddleware: AuthMiddleware = new AuthMiddleware()
router.post("/add-user", authController.addUser)
router.post("/google-signin", authMiddleware.isUserExists,  authController.addUser)
router.post("/sign-in", authMiddleware.isUserExists, authController.signInUser)

export const AuthRoute: Router = router;