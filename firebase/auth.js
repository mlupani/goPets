import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signOut, linkWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, EmailAuthProvider,sendEmailVerification     } from 'firebase/auth'
import { firebaseConfig } from './config'
import { getUserInCollection, addUser } from './client'
import { setChecking } from 'store/slices/usuarios'
let md5 = require('md5')
initializeApp(firebaseConfig)

const auth = getAuth()

export const signInFacebook = () => {

	const provider = new FacebookAuthProvider()
	signInWithPopup(auth, provider)
		.then()
		.catch((error) => {
			if (error.code === 'auth/account-exists-with-different-credential') {
				const credential = FacebookAuthProvider.credentialFromError(error)
				signInGoogle(null, credential)
			}
		})

}

export const signInGoogle = (e, pendingCred = null) => {

	const provider = new GoogleAuthProvider()
	signInWithPopup(auth, provider)
		.then((result) => {
			const user = result.user
			if(pendingCred){
				linkWithCredential(user, pendingCred)
			}
		})
		.catch((error) => {
			console.log('error: ',error)
		})
}

export const signInEmail = (email, password) => {
	password = md5(password)
	console.log(password)
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user
			console.log(user)
		})
		.catch((error) => {
			const errorMessage = error.message
			console.log(errorMessage)
		})
}

export const getUserConnected = async (dispatch, callback) => {
	return auth.onAuthStateChanged(async user=> {
		if(!user) {
			dispatch(callback(null))
			return
		}

		dispatch(setChecking())
		let userFirebase = await getUserInCollection(user)
		if(userFirebase){
			dispatch(callback(userFirebase, false))
		}else if(userFirebase == null){
			userFirebase = await addUser(user)
			dispatch(callback(userFirebase, true))
		}
	})
}

export const logOut = (dispatch, callback) => {
	signOut(auth).then(() => {
		if(callback)
			dispatch(callback())
	}).catch((error) => {
		console.log('error Logout: ',error)
	})
}

export const createUserEmailPass = async (email, password) => {
	password = md5(password)
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			//const user = userCredential.user
			sendEmailVerificationToUser()
		})
		.catch((error) => {
			console.log(error.message)
		})
}

export const LinkUserEmailPass = async (email, password) => {
	password = md5(password)
	const credential = EmailAuthProvider.credential(email, password)
	linkWithCredential(auth.currentUser, credential)
		.then((usercred) => {
			//const user = usercred.user
			//console.log('Account linking success', user)
			sendEmailVerificationToUser()
		}).catch((error) => {
			console.log('Account linking error', error)
		})
}

export const sendEmailVerificationToUser = () => {
	console.log(auth.currentUser)
	sendEmailVerification(auth.currentUser)
		.then(() => {
			console.log('email de verificacion enviado')
		})
}
