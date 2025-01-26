"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    credentials: true,
    origin: "https://personal-dashboard-client.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
