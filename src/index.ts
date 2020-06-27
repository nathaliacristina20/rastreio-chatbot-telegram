import app from "./app";

import { MessageFromChat } from "./shared/interfaces/i.chat";
import IntentsRunService from "./app/services/IntentsRunService";

app.on("message", async (msg: MessageFromChat) => {
  
  const chatId = msg.chat.id;
  const client_response = msg.text.toString().toLowerCase();

  const match = await IntentsRunService.execute(client_response);

  if (typeof match === "string"){

    const message = match.replace('{name}', msg.from.first_name);
    app.sendMessage(chatId, message);

  } else 

  if (match.answers){
    
    if (match.buttons && match.buttons.length >= 0){

        app.sendMessage(
            chatId, match.answers[0],
            {
              reply_markup: {
                keyboard: [match.buttons],
              },
            }
          );

    } else {
        app.sendMessage(chatId, match.answers[0]);
    }

  }

});
