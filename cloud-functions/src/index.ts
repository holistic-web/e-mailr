import * as functions from "firebase-functions";
import onAccountCreation from "./eventHandlers/onAccountCreation";
import sendNewDocument from "./functions/sendNewDocument";
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

export default {
  onAccountCreation,
  sendNewDocument,
};
