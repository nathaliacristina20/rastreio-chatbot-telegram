import { messages } from "./messages"
import { Intent } from "./interfaces/i.intent"
import { regex } from "./regex"
import TrackingController from "../app/controllers/TrackingController"

export const intents: Intent[] = [
   {
    name: "Welcome",
    utterances: ["oi", "ola", "hi", "hello"],
    answers: [messages.WELCOME],
    buttons: []           
   },
   {
    name: "Bye",
    utterances: ["tchau", "flw", "ate", "ate mais", "bye", "xau"],
    answers: [messages.BYE, "Tchau, tchau!", "Bye!", "Espero te ver em breve!"],
    buttons: []
   },
   {
    name: "Command Start",
    utterances: [],
    pattern: regex.COMMANDS.START,
    answers: [messages.WELCOME],
    buttons: [] 
   },
   {
    name: "Tracking Code Pattern",
    utterances: [],
    pattern: regex.TRACKING_CODE,
    answers: [],
    buttons: [],
    function: (message: string) => TrackingController.index(message) 
   }
]
