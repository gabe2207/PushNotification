import { Request, Response, Router } from "express";
import { sendPushNotification } from "../controllers/push-notification";

const router = Router();

router.post("/send-notification", async (req: Request, res: Response) => {
    try {
        await sendPushNotification(req, res);
    } catch (err) {
        console.error("Error in send-notification route:", err);
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
});

export default router;
