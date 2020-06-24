const TelegramBot = require("node-telegram-bot-api");

require('dotenv').config();

const token = process.env.TOKEN;

const { rastro } = require("rastrojs");

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  var myRe = /^[a-z,A-Z]{2}[0-9]{9}[a-z,A-Z]{2}$/;
  var start = /\/start/;

  if (start.exec(msg.text.toString())) {
    bot.sendMessage(
      msg.chat.id,
      `Olá ${msg.from.first_name}, digite seu código para rastrear a sua encomenda.`
    );
  } else if (["oi", "ola", "hi"].includes(msg.text.toString().toLowerCase())) {
    bot.sendMessage(
      msg.chat.id,
      `Olá ${msg.from.first_name}, digite seu código para rastrear a sua encomenda.`
    );
  } else if (
    ["tchau", "flw", "ate", "ate mais"].includes(
      msg.text.toString().toLowerCase()
    )
  ) {
    bot.sendMessage(msg.chat.id, "Espero ver você novamente! Até breve.");
  } else if (myRe.exec(msg.text.toString().toUpperCase())) {
   
    rastro
      .track(msg.text.toString().toUpperCase())
      .then((track) => {

        if (track[0].isInvalid){
          bot.sendMessage(msg.chat.id, "Humm, parece que o código que você digitou não é válido. Confira e tente novamente!");
        } else {

          let msg = `${track[0].tracks[track[0].tracks.length - 1].locale}\n`;
          msg += `${track[0].tracks[track[0].tracks.length - 1].status}\n`;
          msg += `${track[0].tracks[track[0].tracks.length - 1].observation}`;
  
          bot.sendMessage(chatId, msg);

        }
      
      })
      .catch((error) => {
        console.log(error);
        bot.sendMessage(chatId, "Ops, algo deu errado. Tente novamente!");
      });
  } else {
    bot.sendMessage(
      msg.chat.id,
      "Ops, desculpe! Não entendi o que você quis dizer."
    );
  }

});
