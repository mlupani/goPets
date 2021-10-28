import { collection, getDocs, query, where, addDoc, setDoc, doc, Timestamp } from 'firebase/firestore'
//import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './config'
import { mapResults } from './helpers'

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

export const addUser = async ({email, uid, displayName, photoURL, providerData,phoneNumber}) => {

	if(phoneNumber === null && providerData[0]?.providerId === 'password') return null

	const data = {
		avatar: photoURL,
		coords: [],
		email: email,
		firebaseID: uid,
		name: displayName,
		phoneNumber: phoneNumber,
		provider: providerData[0]?.providerId
	}
	const document = await addDoc(collection(db, 'users'), data)

	return {
		...data,
		userID: document.id
	}
}

export const updateUser = async (userUpdated) => {
	const { userID, ...resto } = userUpdated
	await setDoc(doc(db, 'users', userID), resto)
}

export const addPost = async (usuarioID, usuarioName, avatar, title, description, img) => {

	const data = {
		usuarioID,
		usuarioName,
		avatar,
		title,
		img,
		description,
		createdAt: Timestamp.fromDate(new Date()),
	}
	const document = await addDoc(collection(db, 'posts'), data)

	return {
		...data,
		postID: document.id
	}
}

export const getPosts = async (callback) => {

	const q = query(collection(db, 'posts'))
	const querySnapshot = await getDocs(q)
	const { docs } = querySnapshot
	const res = docs.map(val => mapResults(val))
	if(callback)	callback(res)
	else	return res
}


