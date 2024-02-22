import express from "express";
import { sendPushNotification } from "./controllers/push-notification";
import appRoutes from "./routes/app.routes";

const app = express();

app.use(express.json());

// Rota para sendPushNotification
app.post("/api/send-notification", async (req, res) => {
    try {
        await sendPushNotification(req, res);
    } catch (err) {
        console.error("Error in send-notification route:", err);
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
});

// Rota para as demais funcionalidades no app.routes
app.use("/api", appRoutes);

app.listen(4000, () => {
    console.log("Ready to go");
});
