/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import corsLib from "cors";

setGlobalOptions({ maxInstances: 10 });
admin.initializeApp();
const db = admin.database();
const cors = corsLib({ origin: true });

// 🔹 Map for readable form names
const formTypeMap: Record<string, string> = {
  form1: "buyer",
  form2: "vendor",
  form3: "freelancer",
  form4: "media",
};

// 🔹 IST formatter
function getISTString() {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-IN", options).format(new Date());
}

async function handleFormSubmit(req: any, res: any, formName: string) {
  return cors(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).send({ success: false, message: "Method Not Allowed" });
    }

    try {
      const data = req.body;
      logger.info(`Received data for ${formName}`, data);

      // ✅ Add timestamps (IST stored clean)
      const submissionWithTime = {
        ...data,
        timestamp: Date.now(),
        submittedAt: new Date().toISOString(), // UTC ISO (for backup)
        submittedAtIST: getISTString(),        // ✅ Always IST, no seconds
      };

      await db.ref(formName).push(submissionWithTime);

      const readableName = formTypeMap[formName] || formName;

      res.set("Access-Control-Allow-Origin", "*");
      return res.status(200).send({
        success: true,
        message: `${readableName} submitted successfully`,
        formName: readableName,
      });
    } catch (err) {
      logger.error(`Error saving ${formName}`, err);
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(500).send({
        success: false,
        message: `Error saving ${formName}`,
        formName,
      });
    }
  });
}

export const form1 = onRequest((req, res) => handleFormSubmit(req, res, "form1"));
export const form2 = onRequest((req, res) => handleFormSubmit(req, res, "form2"));
export const form3 = onRequest((req, res) => handleFormSubmit(req, res, "form3"));
export const form4 = onRequest((req, res) => handleFormSubmit(req, res, "form4"));

export const getAllForms = onRequest(async (req, res) => {
  return cors(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST, DELETE,OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send("");
    }

    if (req.method !== "GET") {
      return res.status(405).send({ success: false, message: "Method Not Allowed" });
    }

    try {
      const snapshot = await db.ref().once("value");
      const data = snapshot.val() || {};

      res.set("Access-Control-Allow-Origin", "*");
      return res.status(200).send({ success: true, data });
    } catch (err) {
      logger.error("Error fetching forms", err);
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(500).send({ success: false, message: "Error fetching forms" });
    }
  });
});

export const deleteFormEntry = onRequest((req, res) =>
  cors(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send(""); // Preflight success
    }

    if (req.method !== "DELETE") {
      return res.status(405).send({ success: false, message: "Method Not Allowed" });
    }

    const { formName, entryId } = req.body;
    if (!formName || !entryId) {
      return res.status(400).send({ success: false, message: "formName and entryId are required" });
    }

    try {
      await db.ref(`${formName}/${entryId}`).remove();

      const readableName = formTypeMap[formName] || formName;

      res.set("Access-Control-Allow-Origin", "*");
      return res.status(200).send({
        success: true,
        message: "Entry deleted successfully",
        formName: readableName,
        entryId,
      });
    } catch (err) {
      logger.error("Error deleting entry", err);
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(500).send({
        success: false,
        message: "Error deleting entry",
        formName,
        entryId,
      });
    }
  })
);
