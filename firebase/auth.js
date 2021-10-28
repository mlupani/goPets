import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, signOut, linkWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, EmailAuthProvider,sendEmailVerification, sendSignInLinkToEmail, fetchSignInMethodsForEmail } from 'firebase/auth'
import { firebaseConfig } from './config'
import { getUserInCollection, addUser } from './client'
import { setChecking } from 'store/slices/usuarios'
initializeApp(firebaseConfig)

const auth = getAuth()

const errorsLogin = {
	'error': 'Hubo un Error',
	'auth/weak-password' : 'El password debe poseer al menos 6 caracteres',
	'auth/email-already-in-use': 'El Mail ya esta registrado, elije otro',
	'auth/invalid-email': 'Email o usuario inválido',
	'auth/user-not-found': 'Email no registrado',
	'auth/wrong-password': 'Email/Contraseña inválidos',
	'auth/too-many-requests': 'Ha realizado muchos intentos recuerrentes, espere un momento y vuelva a intentarlo',
	'There is no user record corresponding to this identifier. The user may have been deleted.': 'El email no pertenece a ningun usuario registrado.',
	'auth/requires-recent-login': 'Esta acción requiere cerrar sesión y volver a logearse.',
	'auth/invalid-verification-code': 'El codigo ingresado es incorrecto, ingrese el codigo que se le ha enviado al SMS'
}

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
	//password = md5(password)
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			//const user = userCredential.user
		})
		.catch((error) => {
			console.log(error.code)
			const errorMsg = errorsLogin[error.code] || errorsLogin['error']
			return errorMsg
		})
}

export const getUserConnected = async (dispatch, callback) => {
	return auth.onAuthStateChanged(async user=> {
		if(!user) {
			dispatch(callback(null))
			return null
		}

		dispatch(setChecking())
		let userFirebase = await getUserInCollection(user)
		if(userFirebase){
			dispatch(callback(userFirebase, false))
		}else{
			userFirebase = await addUser(user)
			if(userFirebase?.provider === 'password')
				dispatch(callback(userFirebase, false))
			else
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

export const createUserEmailPass = async (email, password, phoneNumber) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const user = {...userCredential.user, phoneNumber}
			await addUser(user)
			sendEmailVerificationToUser()
		})
		.catch((error) => {
			console.log(error.message)
		})
}

export const LinkUserEmailPass = async (email, password) => {
	const credential = EmailAuthProvider.credential(email, password)
	linkWithCredential(auth.currentUser, credential)
		.then(() => {
			sendEmailVerificationToUser()
		}).catch((error) => {
			console.log('Account linking error', error)
		})
}

export const sendEmailVerificationToUser = () => {
	sendEmailVerification(auth.currentUser)
		.then(() => {
			console.log('email de verificacion enviado')
		}).catch(console.log)
}

export const sendVerificationToSignUp = async (email ,pass, telefono) => {

	var actionCodeSettings = {
		url: `${process.env.NEXT_PUBLIC_HOST}/?emailSignUp=${email}&passSignUp=${pass}&phoneSignUp=${telefono}`,
		handleCodeInApp: true,
	}

	sendSignInLinkToEmail(auth, email, actionCodeSettings)
		.then(() => {
			console.log('enviado')
		})
		.catch((error) => {
			//var errorCode = error.code
			var errorMessage = error.message
			console.log(errorMessage)
		})
}

export const checkEmailRegistered = (email) => {
	return fetchSignInMethodsForEmail(auth, email)
		.then((signInMethods) => {
			if(signInMethods.length > 0){
				return true
			}else{
				return false
			}
		})
		.catch((error) => {
			console.log(error)
			// Some error occurred, you can inspect the code: error.code
		})
}
