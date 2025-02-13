import express from "express";
import { bot } from "./bot.js";
import { webhookCallback } from "grammy";
import "dotenv/config";

console.log("Starting app...");

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(`/${process.env.BOT_TOKEN}`, webhookCallback(bot, "express"));

app.get("/", (req, res) => {
    console.log("GET / request received: ", req.query);
    res.sendStatus(200);
});

bot.api.setWebhook(`${process.env.BOT_URL}/${process.env.BOT_TOKEN}`)
.then(() => {
    console.log(`Webhook set on ${process.env.BOT_URL}/`);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
