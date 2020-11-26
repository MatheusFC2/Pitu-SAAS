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
const linksRepository_1 = __importDefault(require("../models/linksRepository"));
function generateCode() {
    let text = '';
    //prettier-ignore
    const possibleCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < 5; index++) {
        //prettier-ignore
        text += possibleCode.charAt(Math.floor(Math.random() * possibleCode.length));
    }
    return text;
}
function postLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body;
        link.code = generateCode();
        link.hits = 0;
        const result = yield linksRepository_1.default.add(link);
        if (!result.id)
            return res.sendStatus(400);
        link.id = result.id;
        res.status(201).json(link);
    });
}
function getLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.params.code;
        const link = yield linksRepository_1.default.findByCode(code);
        if (!link) {
            res.sendStatus(404);
            return;
        }
        res.json(link);
    });
}
function hitLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.params.code;
        const link = yield linksRepository_1.default.hit(code);
        if (!link) {
            res.sendStatus(404);
            return;
        }
        //link.hits!++; // o "!" estou indicando que estou me "responsabilizando" que vai existir o valor
        res.json(link);
    });
}
exports.default = { postLink, getLink, hitLink };
