import * as functions from 'firebase-functions';
import config from '../config';
import { Recipient, Document, DocumentStatus } from '../../../firestore/types';
const admin = require('firebase-admin');
const stripe = require('stripe')(config.stripe.secretKey);
const Lob = require('lob')

const verifyPaymentAndSend = async (data: any, context: any) => {
  if (!context.auth)
    throw new Error('you must be authenticated to call this function');

  try {
    const documentRef = await admin.firestore().collection('documents').doc(data)
    await admin.firestore().runTransaction(async (t: any) => {
      const doc = await t.get(documentRef)
      const documentData = doc.data()
      if (documentData.userId === context.auth.uid) {
        if (documentData.status === DocumentStatus.DRAFT) {
          const session = await stripe.checkout.sessions.retrieve(documentData.stripeSessionId)
          const paymentIntentId = session.payment_intent
          const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
          if (paymentIntent.status === 'succeeded') {
            //  TODO: send the mail w/stannp
            const publishableLob = Lob({ apiKey: config.lob.publishableKey })
            const secretLob = Lob({ apiKey: config.lob.secretKey })
            await verifyAddress(publishableLob, documentData.recipient)
            await sendPostcard(secretLob, documentData)
            await t.update(documentRef, { status: DocumentStatus.SENT });
          } else {
            throw new Error('Payment must succeed to send a letter');
          }
        } else {
          throw new Error('Function is not in draft');
        }
      }
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

async function verifyAddress (lob: any, address: Recipient) {
  const lobRes = await lob.usVerifications.verify(
    {
      primary_line: address.address1,
      city: address.city,
      state: address.state,
      zip_code: address.zip
    },
    {
      case: 'proper'
    }
  )
  console.log('lobRes: ', lobRes);
  return lobRes
}

async function sendPostcard (lob: any, data: Document) {
  // const userRef = await admin.firestore().collection('users').doc(data.userId)
  // let senderEmail
  // const user = await userRef.get()
  // const userData = user.data()
  // senderEmail = userData.email
  const lobRes = lob.postcards.create({
    description: 'Demo Postcard job',
    to: {
      name: data.recipient.firstname + ' ' + data.recipient.lastname,
      address_line1: data.recipient.address1,
      address_line2: data.recipient.address2,
      address_city: data.recipient.city,
      address_state: data.recipient.state,
      address_zip: data.recipient.zip
    },
    // TODO: international
    // from: {
      
    // },
    // TODO: use templates
    front: `<html style="padding: 1in; font-size: 50;"><p>${data.textContent}<p></html>`,
    back:  '<html style="padding: 1in; font-size: 50;"><p>email-r<p></html>'
  })
  console.log('lobRes: ', lobRes);
  return lobRes
}

export default functions.https.onCall(verifyPaymentAndSend);
