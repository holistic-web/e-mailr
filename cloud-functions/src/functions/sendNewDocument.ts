import * as functions from 'firebase-functions';
import { Document, DocumentStatus } from '../../../firestore/types';
import config from '../config';
const admin = require('firebase-admin');
const stripe = require('stripe')(config.stripe.secretKey);

const sendNewDocument = async (data: any, context: any) => {
  if (!context.auth)
    throw new Error('you must be authenticated to call this function');

  // TODO: verify the recipient with the Stannp API

  const document: Document = {
    userId: context.auth.uid,
    textContent: data.textContent,
    recipient: data.recipient,
    status: DocumentStatus.DRAFT,
  };
  const documentsCollection = admin.firestore().collection('documents');
  const documentRef = await documentsCollection.add(document);
  const id = documentRef.id;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: context.auth.token.email,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          product_data: {
            name: 'Mail',
            metadata: {
              documentId: id
            }
          },
          currency: 'gbp',
          unit_amount: 200,
        },
        quantity: 1,
      },
    ],

    success_url: `${config.stripe.redirectBaseUrl}/mail/${id}`,
    cancel_url: `${config.stripe.redirectBaseUrl}/write`
  });

  await documentsCollection.doc(id).update({
    stripeSessionId: session.id,
  });

  return { url: session.url };
};

export default functions.https.onCall(sendNewDocument);
