"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var messages_1 = require("../../shared/messages");
var intents_1 = require("../../shared/intents");
var functions_1 = require("../../shared/util/functions");
var random_js_1 = require("random-js");
var random = new random_js_1.Random;
var IntentsRunService = /** @class */ (function () {
    function IntentsRunService() {
    }
    IntentsRunService.prototype.execute = function (message) {
        var match = intents_1.intents.find(function (intent) {
            if (intent.pattern) {
                if (functions_1.runRegex(intent.pattern, message)) {
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
                return match.function(message).then(function (response) {
                    return response;
                });
            }
            if (match.answers.length > 0) {
                return match.answers[random.integer(0, match.answers.length - 1)];
            }
            return match;
        }
        else {
            return messages_1.messages.NOT_EXPECTED;
        }
    };
    return IntentsRunService;
}());
exports.default = new IntentsRunService();
