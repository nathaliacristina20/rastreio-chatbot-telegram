"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intents = void 0;
var messages_1 = require("./messages");
var regex_1 = require("./regex");
var TrackingController_1 = __importDefault(require("../app/controllers/TrackingController"));
exports.intents = [
    {
        name: "Welcome",
        utterances: ["oi", "ola", "hi", "hello"],
        answers: [messages_1.messages.WELCOME],
        buttons: []
    },
    {
        name: "Bye",
        utterances: ["tchau", "flw", "ate", "ate mais", "bye", "xau"],
        answers: [messages_1.messages.BYE, "Tchau, tchau!", "Bye!", "Espero te ver em breve!"],
        buttons: []
    },
    {
        name: "Command Start",
        utterances: [],
        pattern: regex_1.regex.COMMANDS.START,
        answers: [messages_1.messages.WELCOME],
        buttons: []
    },
    {
        name: "Tracking Code Pattern",
        utterances: [],
        pattern: regex_1.regex.TRACKING_CODE,
        answers: [],
        buttons: [],
        function: function (message) { return TrackingController_1.default.index(message); }
    }
];
