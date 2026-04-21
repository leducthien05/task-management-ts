import express,{Express} from "express";
import dotenv from "dotenv";
dotenv.config();
import * as database from "./config/database";
database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 5000;
// body-parser
// const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Router
import { mainRouterV1 } from "./api/v1/router/index.router";
mainRouterV1(app);

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
});