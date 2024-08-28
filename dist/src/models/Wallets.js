"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WalletsSchema = new mongoose_1.Schema({
    wallet_adress: {
        type: String, default: "", unique: true
    },
    streaks: {
        type: Number, default: 0
    },
}, { timestamps: true });
const Wallets = (0, mongoose_1.model)('wallets', WalletsSchema);
exports.default = Wallets;
//# sourceMappingURL=Wallets.js.map