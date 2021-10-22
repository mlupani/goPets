import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signOut, linkWithCredential } from 'firebase/auth'
import { firebaseConfig } from './config'
import { getUserInCollection, addUser } from './client'
import { setChecking } from 'store/slices/usuarios'
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
			console.log(pendingCred)
			if(pendingCred){
				linkWithCredential(user, pendingCred)
			}
		})
		.catch((error) => {
			console.log('error: ',error)
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
		}else{
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
