"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const addANumber = (a, b) => {
    console.log(node_fs_1.default);
    return (a + b);
};
console.log(addANumber(1, 2));
