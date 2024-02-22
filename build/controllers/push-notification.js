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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = void 0;
const admin = __importStar(require("firebase-admin"));
// Importe o key.json usando require para módulos CommonJS
const serviceAccount = require("../config/key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const sendPushNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrationToken = req.body.fcm_token;
        const message = {
            notification: {
                title: "test",
                body: "Notification message",
            },
            data: {
                FieldId: "1232435",
                Date: "2024-02-14",
            },
            token: registrationToken,
        };
        const response = yield admin.messaging().send(message);
        res.status(200).send({
            message: "Notification sent",
            response: response,
        });
    }
    catch (err) {
        console.error("Error sending push notification:", err);
        // Forneça uma mensagem de erro mais informativa
        let errorMessage = "An unknown error occurred.";
        if (err.code) {
            errorMessage = `Error code: ${err.code} - ${err.message}`;
        }
        res.status(500).send({ message: errorMessage });
    }
});
exports.sendPushNotification = sendPushNotification;
