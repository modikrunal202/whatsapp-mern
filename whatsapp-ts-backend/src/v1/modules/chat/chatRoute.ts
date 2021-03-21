import { Router } from "express"
import { ChatController } from "./chatController";

const router: Router = Router();
const chatController: ChatController = new ChatController();
router.post("/send-message", chatController.sendMessage)
router.get("/get-messages/:id", chatController.getMessages)

export const ChatRoute: Router = router;