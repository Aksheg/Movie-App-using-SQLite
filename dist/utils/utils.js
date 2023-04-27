"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.addMovieSchema = exports.loginUserSchema = exports.options = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    firstName: joi_1.default.string().required(),
    userName: joi_1.default.string().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' })
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});
exports.addMovieSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().lowercase().required(),
    image: joi_1.default.string().required(),
    price: joi_1.default.number().positive().required()
});
exports.updateMovieSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().lowercase(),
    image: joi_1.default.string(),
    price: joi_1.default.number().positive()
});
