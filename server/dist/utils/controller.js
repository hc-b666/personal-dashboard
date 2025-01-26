"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
class Controller {
    constructor() {
        this.validateId = (req, paramName) => {
            const id = parseInt(req.params[paramName]);
            if (!id || isNaN(id)) {
                throw (0, http_errors_1.default)(`Error no id is provided or invalid id`);
            }
            return id;
        };
        this.validateBody = (req, schema) => {
            const result = schema.safeParse(req.body);
            if (!result.success) {
                const firstError = result.error.errors[0];
                throw (0, http_errors_1.default)(400, firstError.message);
            }
            return result.data;
        };
    }
}
exports.default = Controller;
