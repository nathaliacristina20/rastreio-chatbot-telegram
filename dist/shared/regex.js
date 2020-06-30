"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = void 0;
exports.regex = {
    TRACKING_CODE: /^[a-z,A-Z]{2}[0-9]{9}[a-z,A-Z]{2}$/,
    COMMANDS: {
        START: /\/start/
    }
};
