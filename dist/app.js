"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
var token = process.env.TOKEN;
exports.default = new TelegramBot(token, { polling: true });
