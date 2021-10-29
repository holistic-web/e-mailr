import * as functions from 'firebase-functions'
import { User } from '../../../firestore/types'
const admin = require('firebase-admin')

const onAccountCreation = async (user: any, event: any) => {
	const uid = user.uid

	const usersCollection = admin.firestore().collection('users')
	const email = user.email
	const userRecord: User = {
		email: email,
	}
	await usersCollection.doc(uid).set(userRecord)
}

export default functions.auth.user().onCreate(onAccountCreation)
