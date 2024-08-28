"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coinflip_1 = require("../controllers/coinflip");
const router = (0, express_1.Router)();
router.get('/', coinflip_1.getHash);
router.post('/play', coinflip_1.playGame);
router.post('/submit', coinflip_1.storeGameData);
router.post('/ps', coinflip_1.storeps);
exports.default = router;
//# sourceMappingURL=coinflip.js.map