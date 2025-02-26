import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { login, users } from "./src/controllers/auth.controller.js";
import { register } from "./src/controllers/auth.controller.js";
import { createInvoice, allInvoices} from "./src/controllers/invoice.controller.js";
import { createClient, getAllClients, getClient } from "./src/controllers/client.controller.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Facturas API Works just fine :D");
});

//AUTH

app.get("/users", (req, res) => users(req, res));

app.post("/login", async (req, res) => login(req, res));

app.post("/register", async (req, res) => register(req, res));


//INVOICES

app.get("/allinvoices", async (req, res) => allInvoices(req, res));

app.post("/newinvoice", async (req, res) => createInvoice(req, res));


//CLIENTS

app.get("/client/:id", async ( req, res ) => getClient (req, res));

app.post("/newclient", async ( req, res ) => createClient(req, res));

app.get("/allclients", async ( req, res ) => getAllClients(req, res));



app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
