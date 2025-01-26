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
const http_errors_1 = __importDefault(require("http-errors"));
const controller_1 = __importDefault(require("../../utils/controller"));
const createProject_dto_1 = require("./dto/createProject.dto");
const project_service_1 = __importDefault(require("./project.service"));
class ProjectController extends controller_1.default {
    constructor() {
        super();
        this.findAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const result = yield this.projectService.findAll(user.id);
                if (!result.success) {
                    throw (0, http_errors_1.default)(500, "Something went wrong while fetching all projects");
                }
                res.status(200).json(result.data);
            }
            catch (err) {
                next(err);
            }
        });
        this.publicfindAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = this.validateId(req, "userId");
                const result = yield this.projectService.findAll(id);
                if (!result.success) {
                    throw (0, http_errors_1.default)(500, "Something went wrong while fetching all projects");
                }
                res.status(200).json(result.data);
            }
            catch (err) {
                next(err);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const dto = this.validateBody(req, createProject_dto_1.createProjectSchema);
                const result = yield this.projectService.create(user.id, dto);
                if (!result.success) {
                    throw (0, http_errors_1.default)(500, "Something went wrong while updating");
                }
                res.status(201).json({ message: "Successfully created" });
            }
            catch (err) {
                next(err);
            }
        });
        this.projectService = project_service_1.default.getInstance();
    }
}
exports.default = new ProjectController();
