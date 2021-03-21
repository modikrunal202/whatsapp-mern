import * as express from 'express';
import { Middlewar } from './middleware';
import { AuthRoute } from './v1/modules/auth/authRoute';
import { ChatRoute } from './v1/modules/chat/chatRoute';
import { ContactsRoute } from './v1/modules/contacts/contactsRoute';

export class Routes {
    private middleware: Middlewar = new Middlewar();
    public path() {
        const router = express.Router();
        router.use("/auth", AuthRoute)
        router.use("/contacts", this.middleware.getAuthorization, ContactsRoute)
        router.use("/messages", this.middleware.getAuthorization, ChatRoute)
        router.all("/*", (req, res) => {
            return res.status(404).json({
                error: "ERR_URL_NOT_FOUND",
            });
        });
        return router;
    }
}