import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/sensorRoutes";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();


class App {
    
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = `mongodb://${process.env.MONGO_DB_HOST}:27017/${process.env.MONGO_DB_NAME}`;

    constructor() {
        this.app = express();
        this.config();        
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;        
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });        
    }

}

export default new App().app;