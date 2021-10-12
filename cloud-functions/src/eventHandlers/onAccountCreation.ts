import { User } from '../../../firestore/types'
const admin = require('firebase-admin')

const onAccountCreation = async (user: any, event: any) => {
	const uid = user.uid
	const email = user.email

	const usersCollection = admin.firestore().collection('users')
	const userRecord: User = {
		email: email,
	}
	await usersCollection.doc(uid).set(userRecord)
}

export default onAccountCreation
