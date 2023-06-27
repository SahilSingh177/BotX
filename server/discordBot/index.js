//EXTERNAL IMPORTS
import express from "express";
import {} from "dotenv/config"; //initialize dotenv

//INTERNAL IMPORTS
import initializeClient from "./initializeClient.js";
import handleCommands from './discord/index.js';

const app = express();
const port = process.env.PORT || 3000;
const client = initializeClient();


handleCommands(client);
client.login("MTAzNjY2NDU3NDg1MTY5ODcyMA.GIEaJN.DJ2Ez-5T6-8cinMWDU55_yNxptDae_SP7HjcD8");

app.listen(port);