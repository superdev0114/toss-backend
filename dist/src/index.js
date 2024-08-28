"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("../config/database"));
const routes_1 = __importDefault(require("./routes"));
const validation_1 = require("./middleware/validation");
const config_1 = require("./config");
const app = (0, express_1.default)();
(0, database_1.default)();
app.set('port', config_1.PORT);
app.use((0, cors_1.default)({
    origin: JSON.parse(config_1.WHITE_LIST)
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/api', routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
app.use(validation_1.RetrunValidation);
const http = require('http').createServer(app);
http.listen(config_1.PORT);
console.log('server listening on:', config_1.PORT);
//# sourceMappingURL=index.js.map