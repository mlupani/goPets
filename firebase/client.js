import { collection, getDocs, query, where, addDoc, setDoc, doc } from 'firebase/firestore'
//import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './config'
import { mapResults } from './helpers'
let md5 = require('md5')

export const getUsers = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'users'))
		const { docs } = querySnapshot
		const res = docs.map(mapResults)
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}

export const getUserInCollection = async (user) => {

	if(!user) {
		return null
	}

	let providers = user.providerData.map(prov => prov.providerId)

	const q = query(collection(db, 'users'), where('firebaseID', '==', user.uid))
	const querySnapshot = await getDocs(q)
	const { docs } = querySnapshot
	const res = docs.map(val => mapResults(val, providers, 'providers'))[0]
	return res
}

export const addUser = async ({email, uid, displayName, photoURL}) => {
	const data = {
		avatar: photoURL,
		coords: [],
		email: email,
		firebaseID: uid,
		name: displayName,
		phoneNumber: null
	}
	const document = await addDoc(collection(db, 'users'), data)

	return {
		...data,
		userID: document.id
	}
}

export const updateUser = async (userUpdated) => {
	const { userID, ...resto } = userUpdated
	resto.password = md5(resto.password)
	await setDoc(doc(db, 'users', userID), resto)
}
