"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.RetrunValidation = exports.V = void 0;
const Joi = __importStar(require("joi"));
const Validation = __importStar(require("express-joi-validation"));
exports.V = Validation.createValidator({ passError: true });
const RetrunValidation = (error, req, res, next) => {
    if (error && error.error && error.value && error.type) {
        return res.status(400).json(error.error.toString().replace('Error: ', ''));
    }
    else {
        return next(error);
    }
};
exports.RetrunValidation = RetrunValidation;
exports.Validator = {
    ObjectId: Joi.object({
        id: Joi.string().min(24).max(24).required()
    }),
    UserId: Joi.object({
        userId: Joi.string().min(24).max(24).required()
    }),
    AccountId: Joi.object({
        accountId: Joi.string().required()
    }),
    Token: {
        Get: Joi.object({
            accountId: Joi.string().required(),
        })
    },
    Balance: {
        Withdraw: Joi.object({
            accountId: Joi.string().required(),
            amount: Joi.number().required(),
            token: Joi.string().required(),
        }),
    }
};
//# sourceMappingURL=validation.js.map