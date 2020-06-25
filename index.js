const TelegramBot = require("node-telegram-bot-api");
const { rastro } = require("rastrojs");

const DateFns = require("date-fns");

const ptBR = require("date-fns/locale/pt-BR");

require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

let modeTrack = false;

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  var myRe = /^[a-z,A-Z]{2}[0-9]{9}[a-z,A-Z]{2}$/;
  var start = /\/start/;
  
  if (
    start.exec(msg.text.toString()) ||
    ["oi", "ola", "hi"].includes(msg.text.toString().toLowerCase())
  ) {

    modeTrack = false;

    bot.sendMessage(
      msg.chat.id,
      `Olá ${msg.from.first_name}, seja benvindo(a)! Como posso te ajudar hoje?`,
      {
        reply_markup: {
          keyboard: [["Rastrear minha encomenda"]],
        },
      }
    );
  } else if (
    ["tchau", "flw", "ate", "ate mais"].includes(
      msg.text.toString().toLowerCase()
    )
  ) {

    modeTrack = false;
    
    bot.sendMessage(msg.chat.id, "Espero ver você novamente! Até breve.");
  } else if (msg.text.toString() === "Rastrear minha encomenda") {

    modeTrack = true;

    bot.sendMessage(
      msg.chat.id,
      "Certo! Digite seu código para rastreiar sua encomenda."
    );
   
  } else if (modeTrack === true){

    if (myRe.exec(msg.text.toString().toUpperCase())) {
      rastro
        .track(msg.text.toString().toUpperCase())
        .then((track) => {
          if (track[0].isInvalid) {
            bot.sendMessage(
              msg.chat.id,
              "Humm, parece que o código que você digitou não é válido. Confira e tente novamente!"
            );
          } else {
            const dateFormatted = DateFns.format(
              track[0].tracks[track[0].tracks.length - 1].trackedAt,
              "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
              { locale: ptBR }
            );

            console.log(dateFormatted);
            let msg = `${dateFormatted}\n`;
            msg += `${track[0].tracks[track[0].tracks.length - 1].locale}\n`;
            msg += `${track[0].tracks[track[0].tracks.length - 1].status}\n`;
            msg += `${track[0].tracks[track[0].tracks.length - 1].observation}`;

            bot.sendMessage(chatId, "Este é o último status da sua encomenda");
            bot.sendMessage(chatId, msg);
          }
        })
        .catch((error) => {
          console.log(error);
          bot.sendMessage(chatId, "Ops, algo deu errado. Tente novamente!");
        });
    } else {
      bot.sendMessage(chatId, "Humm, parece que o código que você digitou não é válido. Confira e tente novamente!");
    }
    
  } else {
    bot.sendMessage(
      msg.chat.id,
      "Ops, desculpe! Não entendi o que você quis dizer."
    );
  }
});
