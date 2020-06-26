import app from "./app";

import { messages } from "./shared/messages";
import { utterances } from "./shared/utterances";
import { regex } from "./shared/regex";

import { MessageFromChat } from "./shared/interfaces/i.chat";
import { runRegex } from "./shared/util/functions";

import TrackingController from "./app/controllers/TrackingController";

let trackingMode = false;

app.on("message", (msg: MessageFromChat) => {
  
  const chatId = msg.chat.id;
  const client_response = msg.text.toString().toLowerCase();

  if (
    runRegex(regex.COMMANDS.START, client_response) ||
    utterances.HI.includes(client_response)
  ) {
    changeTrackingMode(false);

    const message = messages.WELCOME.replace('#name#', msg.from.first_name);

    app.sendMessage(
      chatId, message,
      {
        reply_markup: {
          keyboard: [[messages.TRACKING_BUTTON]],
        },
      }
    );

  } else if (utterances.BYE.includes(client_response)) {
    changeTrackingMode(false);
    app.sendMessage(chatId, messages.BYE);
  } else if (client_response === messages.TRACKING_BUTTON.toLowerCase()) {
    changeTrackingMode(true);

    app.sendMessage(
      chatId,
      "Certo! Digite seu código para rastreiar sua encomenda."
    );
  } else if (trackingMode === true) {
      
    const tracking_response = TrackingController.index(client_response);    
    app.sendMessage(chatId, tracking_response);
    
  } else {
    app.sendMessage(chatId, messages.NOT_EXPECTED);
  }
});

function changeTrackingMode(status: boolean) {
  trackingMode = status;
}
