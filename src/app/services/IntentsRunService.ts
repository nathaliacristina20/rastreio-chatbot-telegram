
import { messages } from "../../shared/messages";
import { intents } from "../../shared/intents";
import { Intent } from "../../shared/interfaces/i.intent";
import { runRegex } from "../../shared/util/functions";
import { Random } from 'random-js';

const random = new Random;

interface IntentResponse {
    answer: string;
    buttons?: [] 
}
class IntentsRunService {

    execute(message: string): Intent | string {

        const match = intents.find((intent) => {

            if (intent.pattern) {

                if (runRegex(intent.pattern, message)) {
                    return intent;
                }

            }

            if (!intent.pattern) {

                if (intent.utterances.includes(message)) {
                    return intent;
                }

            }
           
        });

        if (match) {

            if (match && match.function) {

                return match.function(message).then((response: string) => {
                    return response;
                });

            }

            if (match.answers.length > 0){
                return match.answers[random.integer(0, match.answers.length - 1)];
            }             

            return match;

        } else {
            return messages.NOT_EXPECTED;
        }

    }

}

export default new IntentsRunService();
