import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { login, users } from "./src/controllers/auth.controller.js";
import { register } from "./src/controllers/auth.controller.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("SI SIRVEEEEE");
});

app.post("/login", async (req, res) => login(req, res));

app.post("/register", async (req, res) => register(req, res));

app.get("/users", (req,res) => users(req,res));


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
