import * as express from 'express';
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import * as cors from 'cors'
const socketIo = require("socket.io");
import * as http from "http";
import * as path from "path";
import { DB } from "./database"
import { Routes } from "./routes";
dotenv.config();
class App {
    public app: express.Application;
    public NODE_ENV;
    public io: any
    constructor() {
        this.NODE_ENV = process.env.NODE_ENV;
        this.app = express();
        this.middlewares();
        this.routes();
        DB.init();
    }
    private middlewares() {
        this.app.use(cors())
        // this.app.all("/*", (req, res, next) => {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Request-Headers", "*");
        //     // tslint:disable-next-line: max-line-length
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale");
        //     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
        //     if (req.method === "OPTIONS") {
        //         res.writeHead(200);
        //         res.end();
        //     } else {
        //         next();
        //     }
        // });
        if (this.NODE_ENV === "development") {
            this.app.use(express.static(path.join(process.cwd(), "public")));
            // set the static files location of bower_components
            this.app.use(morgan("dev")); // log every request to the console
        }
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json(), (error: any, req: any, res: any, next: () => void) => {
            if (error) {
                return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
            }
            next();
        });
    }
    private routes() {
        const routes = new Routes();
        this.app.use("/", routes.path());
    }
    // constructor() {
    //     const NODE_ENV = process.env.NODE_ENV;
    //     console.log('inside contstructor', NODE_ENV);
    //     const PORT = process.env.PORT as string;
    //     this.app = express();
    //     const server = http.createServer(this.app);
    //     this.io = socketIo(server)
    //     this.app.all("/*", (req, res, next) => {
    //         res.header("Access-Control-Allow-Origin", "*");
    //         res.header("Access-Control-Request-Headers", "*");
    //         // tslint:disable-next-line: max-line-length
    //         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale");
    //         res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    //         if (req.method === "OPTIONS") {
    //             res.writeHead(200);
    //             res.end();
    //         } else {
    //             next();
    //         }
    //     });
    //     if (NODE_ENV === "development") {
    //         this.app.use(express.static(path.join(process.cwd(), "public")));
    //         // set the static files location of bower_components
    //         this.app.use(morgan("dev")); // log every request to the console
    //     }
    //     this.app.use(bodyParser.json({ limit: "50mb" }));
    //     this.app.use(bodyParser.urlencoded({ extended: true }));
    //     this.app.use(bodyParser.json(), (error: any, req: any, res: any, next: () => void) => {
    //         if (error) {
    //             return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
    //         }
    //         next();
    //     });
    //     const routes = new Routes();
    //     this.app.use("/", routes.path());
    //     server.listen(PORT, () => {
    //         console.log(`The server is running in port localhost: ${process.env.PORT}`);
    //         this.app.use((err: any, req: any, res: any, next: () => void) => {
    //             if (err) {
    //                 console.log(err)
    //                 res.status(500).json({ error: "Internal server error" });
    //                 return;
    //             }
    //             next();
    //         });
    //     });
    // }
}
export default new App().app