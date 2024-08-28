"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playGame = exports.storeGameData = exports.storeps = exports.getHash = void 0;
const UserHashes_1 = __importDefault(require("../models/UserHashes"));
const Wallets_1 = __importDefault(require("../models/Wallets"));
function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function getGameResult() {
    const coin1 = Math.random() < 0.5 ? 'h' : 't';
    let coin2;
    // If coin1 is 'h', coin2 can be either 'h' or 't'
    if (coin1 === 'h') {
        coin2 = Math.random() < 0.5 ? 'h' : 't';
    }
    else {
        // If coin1 is 't', coin2 must also be 't'
        coin2 = 't';
    }
    const tossResult = `${coin1}${coin2}`;
    return tossResult;
}
const getHash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userhash = generateRandomString();
        const newDoc = new UserHashes_1.default({ userhash });
        const newData = yield newDoc.save();
        return res.json({ data: newData });
    }
    catch (error) {
        console.error(`error`, error);
        return res.status(400).json('Interanal server error');
    }
});
exports.getHash = getHash;
const storeps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userhash } = req.body;
        if (userhash.length > 25)
            console.log('userhash', userhash);
        const newDoc = new UserHashes_1.default({ userhash });
        const newData = yield newDoc.save();
        return res.json({ data: newData });
    }
    catch (error) {
        console.error(`error`, error);
        return res.status(400).json('Interanal server error');
    }
});
exports.storeps = storeps;
const storeGameData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userhash, address } = req.body;
        if (!userhash || !address)
            return res.json({ result: "ERROR", error: "Missing required arguments" });
        const gameData = yield UserHashes_1.default.findOne({ userhash });
        if (gameData.streaks < 2) {
            return res.json({ result: "ERROR", error: "Minium streak point is 2" });
        }
        const isExist = yield Wallets_1.default.find({ wallet_adress: address });
        if (isExist.length !== 0) {
            if (gameData.streaks > isExist[0].streaks) {
                const updatedData = yield Wallets_1.default.findOneAndUpdate({ wallet_adress: address }, { streaks: gameData.streaks });
                return res.json({ data: updatedData });
            }
            else {
                return res.json({ result: "No update.", data: isExist[0] });
            }
        }
        else {
            const newDoc = new Wallets_1.default({ wallet_adress: address, streaks: gameData.streaks });
            const newData = yield newDoc.save();
            return res.json({ data: newData });
        }
    }
    catch (error) {
        console.error(`error`, error);
        return res.status(400).json('Interanal server error');
    }
});
exports.storeGameData = storeGameData;
const playGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userhash, id } = req.body;
        if (!userhash || !id)
            return res.json({ result: "ERROR", error: "Missing required arguments" });
        const tossResult = getGameResult();
        if (tossResult === id) {
            const gameData = yield UserHashes_1.default.findOne({ userhash });
            yield UserHashes_1.default.updateOne({ userhash }, { streaks: gameData.streaks + 1 });
            return res.json({ result: tossResult, streaks: gameData.streaks + 1 });
        }
        else
            return res.json({ result: tossResult, streaks: 0 });
    }
    catch (error) {
        console.error(`error`, error);
        return res.status(400).json('Interanal server error');
    }
});
exports.playGame = playGame;
//# sourceMappingURL=coinflip.js.map