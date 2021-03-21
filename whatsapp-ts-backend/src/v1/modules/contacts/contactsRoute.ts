import { Router } from "express";
import { ContactsController } from './contactsController';

const router: Router = Router();
const contactsController: ContactsController = new ContactsController();
router.get("/", contactsController.getContacts);
router.get("/:id", contactsController.getContactById)
export const ContactsRoute: Router = router;