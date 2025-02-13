import { Bot } from "grammy";
import "dotenv/config"

const bot = new Bot(process.env.BOT_TOKEN);

bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "health", description: "Check the API's health" },
]).then(() => console.log("Команды установлены!"))
    .catch((err) => console.error("Ошибка при установке команд:", err));

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("health", HandleHealth);

bot.on("message", HandleMessage);

async function HandleMessage(ctx) {
    const msgTxt = ctx.message.text
    const body = {
        "author_id": 32836283,//отправитель сообщения
        "chat_id": process.env.CHAT_ID,
        "chat_type": "u2i",
        "content": { "text": msgTxt },
        "created": 82362836,
        "id": "3923729",
        "item_id": 8383883,
        "read": 943497439,
        "type": "text",
        "user_id": process.env.USER_ID//владелец аккаунта
    };

    try {
        const res = await fetch(`${process.env.API_URL}/webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
console.log(res)
        const resObj = await res.json()
        let text = resObj.response

        if (!text) {
            text = "no message 😭"
        }
        ctx.reply(text);
        
    } catch (e) {
        console.error("Fetch error: ", e);
    }
}

async function HandleHealth(ctx) {
    const res = await fetch(`${process.env.API_URL}/health`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    ctx.reply(`I'm ${res.statusText}`);
}

bot.catch((err) => {
    console.error(err);
});

export { bot };