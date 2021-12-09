import * as functions from 'firebase-functions';
import config from '../config';
const admin = require('firebase-admin');
const stripe = require('stripe')(config.stripe.secretKey);

const verifyPaymentAndSend = async (data: any, context: any) => {
  console.log('config: ', config);
  console.log('data: ', data);
  if (!context.auth)
    throw new Error('you must be authenticated to call this function');

  try {
    const documentRef = await admin.firestore().collection('documents').where('stripeSessionId','==', data.sessionId);
    const res = await admin.firestore().runTransaction(async (t: any) => {
      const doc = await t.get(documentRef)
      const documentData = doc.data()
      if (documentData.userId === context.auth.uid) {
        if (!documentData.inFlight) {
          await t.update(documentRef, { inFlight: true });
          const session = await stripe.checkout.sessions.retrieve(data.stripeSessionId)
          const paymentIntentId = session.payment_intent
          const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
          if (paymentIntent.status === 'succeeded') {
            //  send the mail
            console.log('send letter now');
          } else {
            console.log('your payment must succeed to send a letter');
            // throw new Error('your payment must succeed to send a letter');
          }
        } else {
          throw new Error('Function already in flight');
        }
      }
    });
    console.log('Transaction success', res);
  } catch (e) {
    console.log('Transaction failure:', e);
  }
    
  // const documentsCollectionSnapshot = await admin.firestore().collection('documents').where('userId','==', context.auth.uid).get();
  // for (const document of documentsCollectionSnapshot.docs) {
  //   const documentData = document.data()
  //   if (data.stripeSessionId === documentData.stripeSessionId) {
  //     const session = await stripe.checkout.sessions.retrieve(data.stripeSessionId)
  //     const paymentIntentId = session.payment_intent
  //     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
  //     if (paymentIntent.status === 'succeeded') {
  //       //  send the mail
  //       console.log('send letter now');
  //     } else {
  //       console.log('your payment must succeed to send a letter');
  //       // throw new Error('your payment must succeed to send a letter');
  //     }
  //   }
  // }
}

export default functions.https.onCall(verifyPaymentAndSend);
