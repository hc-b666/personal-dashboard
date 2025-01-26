"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const app_1 = require("./app");
dotenv_1.default.config();
const app = (0, app_1.createApp)();
const httpServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
