import express from "express";
import { taskRouter } from "./src/routes/task.routers.js";
import { startDb } from "./src/config/database.js";
import path from "node:path";
import cors from "cors";
import { fileURLToPath } from "node:url";
import helmet from "helmet";
import morgan from "morgan";
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))
app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(express.static(path.join(__dirname, "src", "public")));
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

app.use("/", taskRouter)

app.listen(port,() => {
    console.log(`server listening http://localhost:${port}`) 
    startDb()
});