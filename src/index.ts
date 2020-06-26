import app from "./app";

import { rastro } from "rastrojs";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { messages } from "./shared/messages";
import { utterances } from "./shared/utterances";
import { regex } from "./shared/regex";

import { MessageFromChat } from "shared/interfaces/i.chat";

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
    const tracking_response = tracking(client_response);
    app.sendMessage(chatId, tracking_response);
  } else {
    app.sendMessage(chatId, messages.NOT_EXPECTED);
  }
});

function changeTrackingMode(status: boolean) {
  trackingMode = status;
}

function runRegex(pattern: any, phase: string) {
  return pattern.exec(phase);
}

async function tracking(trackingCode: string) {
  if (runRegex(regex.TRACKING_CODE, trackingCode)) {
    try {
      const tracking = await rastro.track(trackingCode);

      if (tracking && tracking.length >= 0) {
        const tracking_length = (tracking[0].tracks?.length || 0) - 1;

        if (tracking[0].isInvalid) {
          return messages.INVALID_CODE;
        } else {
          let message;

          if (tracking[0].tracks) {
            const trackingDate = format(
              tracking[0].tracks[tracking_length].trackedAt,
              "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
              { locale: ptBR }
            );

            message = `${trackingDate}\n`;

            message += `${tracking[0].tracks[tracking_length].locale}\n`;
            message += `${tracking[0].tracks[tracking_length].status}\n`;
            message += `${tracking[0].tracks[tracking_length].observation}`;

            return message;
          }
        }
      }
    } catch (error) {
      return messages.GENERIC_ERROR;
    }
  } else {
    return messages.INVALID_CODE;
  }
}
