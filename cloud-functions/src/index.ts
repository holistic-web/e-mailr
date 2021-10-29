import * as functions from 'firebase-functions'
import onAccountCreation from './eventHandlers/onAccountCreation'
import stripeApi from './stripe-api'
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.onAccountCreation = functions.auth.user().onCreate(onAccountCreation)
exports.stripeApi = functions.https.onRequest(stripeApi)
