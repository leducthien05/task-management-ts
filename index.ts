import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import * as database from "./config/database";
database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 5000;
// CORS
// const corsOption = [
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// ];
// app.use(cors(corsOption));
app.use(cors());
// body-parser
// const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Router
import { mainRouterV1 } from "./api/v1/router/index.router";
mainRouterV1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});