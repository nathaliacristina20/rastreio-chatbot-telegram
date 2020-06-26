const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config();
const token = process.env.TOKEN;

export default new TelegramBot(token, { polling: true });
