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

                    let message = "";

                    if (tracking[0].tracks) {
                        const trackingDate = tracking[0].tracks[tracking_length].trackedAt ? format(
                            tracking[0].tracks[tracking_length].trackedAt,
                            "dd'/'MM'/'yyyy HH:mm"
                        ) : null;

                        message += tracking[0].tracks[tracking_length].status ? `<b>${tracking[0].tracks[tracking_length].status}</b>\n` : '';
                        message += tracking[0].tracks[tracking_length].observation ? `${tracking[0].tracks[tracking_length].observation}\n` : '';
                        message += tracking[0].tracks[tracking_length].locale ? `${tracking[0].tracks[tracking_length].locale.toUpperCase()}\n` : '';
                        message += trackingDate ? `${trackingDate}\n` : '';
                        
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
