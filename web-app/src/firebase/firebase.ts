import firebase from 'firebase/app'

// firebase config can be found in your firebase project
const firebaseConfig = {
    apiKey: 'AIzaSyB5irGw1DcW9eIP-Hm11QEROWPqoCSemJM',
    authDomain: 'e-mailr.firebaseapp.com',
    projectId: 'e-mailr',
    storageBucket: 'e-mailr.appspot.com',
    messagingSenderId: '122365387389',
    appId: '1:122365387389:web:959b1dfc443fcde1c90714',
    measurementId: 'G-4MR4SWV5SB'
}

firebase.initializeApp(firebaseConfig)

export default firebase
