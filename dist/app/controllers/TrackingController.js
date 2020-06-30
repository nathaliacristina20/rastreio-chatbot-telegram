"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rastrojs_1 = require("rastrojs");
var date_fns_1 = require("date-fns");
var messages_1 = require("../../shared/messages");
var TrackingController = /** @class */ (function () {
    function TrackingController() {
    }
    TrackingController.prototype.index = function (trackingCode) {
        return rastrojs_1.rastro.track(trackingCode.toUpperCase()).then(function (tracking) {
            var _a;
            if (tracking && tracking.length >= 0) {
                if (tracking[0].isInvalid) {
                    return messages_1.messages.INVALID_CODE;
                }
                else {
                    var tracking_length = (((_a = tracking[0].tracks) === null || _a === void 0 ? void 0 : _a.length) || 0) - 1;
                    var message = "";
                    if (tracking[0].tracks) {
                        var trackingDate = tracking[0].tracks[tracking_length].trackedAt ? date_fns_1.format(tracking[0].tracks[tracking_length].trackedAt, "dd'/'MM'/'yyyy HH:mm") : null;
                        message += tracking[0].tracks[tracking_length].status ? "<b>" + tracking[0].tracks[tracking_length].status + "</b>\n" : '';
                        message += tracking[0].tracks[tracking_length].observation ? tracking[0].tracks[tracking_length].observation + "\n" : '';
                        message += tracking[0].tracks[tracking_length].locale ? tracking[0].tracks[tracking_length].locale.toUpperCase() + "\n" : '';
                        message += trackingDate ? trackingDate + "\n" : '';
                        return message;
                    }
                }
            }
        }).catch(function () {
            return messages_1.messages.GENERIC_ERROR;
        });
    };
    return TrackingController;
}());
exports.default = new TrackingController();
