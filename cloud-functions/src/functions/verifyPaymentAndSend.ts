// import config from "../config";
import * as functions from "firebase-functions";
const stripe = require("stripe")("sk_test_51H5aXrBOHct1ZvxbphXmm0zC9G4IPcs3oYUCUhfxn7IsbzKHJMjAGWuPUHBjtiXMzoNO6eIwbTwOzIGo52H6AiNo00Z9g2nftu");
const admin = require("firebase-admin");

const verifyPaymentAndSend = async (data: any, context: any) => {
  console.log('data: ', data);
  if (!context.auth)
    throw new Error("you must be authenticated to call this function");
  
  const documentsCollectionSnapshot = await admin.firestore().collection("documents").where('userId','==', context.auth.uid).get();
  for (const document of documentsCollectionSnapshot.docs) {
    const data = document.data()
    if (data.stripeSessionId) {
      const session = await stripe.checkout.sessions.retrieve(data.stripeSessionId)
      const paymentIntentId = session.payment_intent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
      if (paymentIntent.status === 'succeeded') {
        //  send the mail
        console.log('send letter now');
      } else {
        console.log("your payment must succeed to send a letter");
        // throw new Error("your payment must succeed to send a letter"); 
      }
    }
  }
}

export default functions.https.onCall(verifyPaymentAndSend);
