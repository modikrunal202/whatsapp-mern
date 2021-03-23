import * as mongoose from "mongoose";
import * as dotenv from "dotenv"
dotenv.config();
export class DB {
    public static init() {
        mongoose.connect(process.env.CONNECTION_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`Successfully connected to db`);
        }).catch(error => {
            console.log("Error connecting to database: ", error);
            process.exit(1);
        });
    }
}

export const database = mongoose.connection;