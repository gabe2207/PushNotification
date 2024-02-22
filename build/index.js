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
const express_1 = __importDefault(require("express"));
const push_notification_1 = require("./controllers/push-notification");
const app_routes_1 = __importDefault(require("./routes/app.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rota para sendPushNotification
app.post("/api/send-notification", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, push_notification_1.sendPushNotification)(req, res);
    }
    catch (err) {
        console.error("Error in send-notification route:", err);
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
}));
// Rota para as demais funcionalidades no app.routes
app.use("/api", app_routes_1.default);
app.listen(4000, () => {
    console.log("Ready to go");
});
