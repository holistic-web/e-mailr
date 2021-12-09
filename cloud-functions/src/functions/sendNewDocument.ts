import * as functions from "firebase-functions";
import { Document, DocumentStatus } from "../../../firestore/types";
// import config from "../config";
const admin = require("firebase-admin");
// TODO: set up dev and live values for stripe secret key
const stripe = require("stripe")("sk_test_51H5aXrBOHct1ZvxbphXmm0zC9G4IPcs3oYUCUhfxn7IsbzKHJMjAGWuPUHBjtiXMzoNO6eIwbTwOzIGo52H6AiNo00Z9g2nftu");

const sendNewDocument = async (data: any, context: any) => {
  console.log('context: ', context);
  console.log('data: ', data);
  if (!context.auth)
    throw new Error("you must be authenticated to call this function");

  // TODO: verify the recipient with the Stannp API

  const document: Document = {
    userId: context.auth.uid,
    textContent: data.textContent,
    recipient: data.recipient,
    status: DocumentStatus.DRAFT,
  };
  const documentsCollection = admin.firestore().collection("documents");
  const documentRef = await documentsCollection.add(document);
  const id = documentRef.id;

  // Create a stripe session and redirect the user to the payments page
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: context.auth.token.email,
    mode: "payment",
    line_items: [
      {
        price_data: {
          product_data: {
            name: "Mail",
            metadata: {
              documnameentId: id
            }
          },
          currency: "gbp",
          unit_amount: 200,
        },
        quantity: 1,
      },
    ],

    // TODO: implement a page that handles the stripe redirect on completion
    // TODO: how do we verify we were actually sent to this page by stripe?
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    // TODO: tidy up the success / cancel pages that already exist if we don't use them
  });
  console.log('session: ', session);
  // Attach the stripe session id to the document in our database
  await documentsCollection.doc(id).update({
    stripeSessionId: session.id,
  });

  return { url: session.url };
};

export default functions.https.onCall(sendNewDocument);
