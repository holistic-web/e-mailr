import config from "../config";
const stripe = require("stripe")(config.stripe_secret_key);
import * as functions from "firebase-functions";

const verifyPaymentAndSend = async (data: any, context: any) => {
  const session = await stripe.checkout.sessions.retrieve(data.sessionId)
  const paymentIntentId = session.payment_intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
  if (paymentIntent.status === 'succeeded') {
    //  send the mail
    console.log('send letter now');
  } else {
    throw new Error("your payment must succeed to send a letter"); 
  }
}

export default functions.https.onCall(verifyPaymentAndSend);
