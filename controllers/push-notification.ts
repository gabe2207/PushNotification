import * as admin from "firebase-admin";
import { Request, Response } from "express";

// Importe o key.json usando require para módulos CommonJS
const serviceAccount = require("../config/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const registrationToken = req.body.fcm_token;

    const message: admin.messaging.Message = {
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

    const response = await admin.messaging().send(message);

    res.status(200).send({
      message: "Notification sent",
      response: response,
    });
  } catch (err: any) {
    console.error("Error sending push notification:", err);
    
    // Forneça uma mensagem de erro mais informativa
    let errorMessage = "An unknown error occurred.";
    if (err.code) {
      errorMessage = `Error code: ${err.code} - ${err.message}`;
    }
    
    res.status(500).send({ message: errorMessage });
  }
};