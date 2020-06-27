import { rastro } from "rastrojs";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { messages } from "../../shared/messages";

class TrackingController {

    index(trackingCode: string) {

        return rastro.track(trackingCode.toUpperCase()).then(tracking => {

            if (tracking && tracking.length >= 0) {
              
                if (tracking[0].isInvalid) {
                    return messages.INVALID_CODE;
                } else {

                    const tracking_length = (tracking[0].tracks?.length || 0) - 1;

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

        }).catch(() => {
            return messages.GENERIC_ERROR;
        });

    }

}

export default new TrackingController();
