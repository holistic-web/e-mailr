import * as functions from 'firebase-functions';
import config from '../config';
import { DocumentStatus } from '../../../firestore/types';
const admin = require('firebase-admin');
const stripe = require('stripe')(config.stripe.secretKey);

const verifyPaymentAndSend = async (data: any, context: any) => {
  if (!context.auth)
    throw new Error('you must be authenticated to call this function');

  try {
    const documentRef = await admin.firestore().collection('documents').doc(data)
    await admin.firestore().runTransaction(async (t: any) => {
      const doc = await t.get(documentRef)
      const documentData = doc.data()

      if (documentData.userId !== context.auth.uid) throw new Error('you are not authorized to perform this action')
      if (documentData.status !== DocumentStatus.DRAFT) throw new Error('you can only send a draft document')

      const session = await stripe.checkout.sessions.retrieve(documentData.stripeSessionId)
      const paymentIntentId = session.payment_intent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

      if (paymentIntent.status !== 'succeeded') throw new Error('payment was not successful')
      //  TODO: send the mail with stannp
      await t.update(documentRef, { status: DocumentStatus.SENT });
    });
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
