"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserHashSchema = new mongoose_1.Schema({
    userhash: {
        type: String, default: "", unique: true
    },
    streaks: {
        type: Number, default: 0
    },
}, { timestamps: true });
const UserHash = (0, mongoose_1.model)('userhashes', UserHashSchema);
exports.default = UserHash;
//# sourceMappingURL=UserHashes.js.map